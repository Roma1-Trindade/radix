import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import AuthService from './modules/(auth)/services/auth-service';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

const publicRoutes = [
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const isAPIRoute = pathname.startsWith('/api');
  if (isAPIRoute) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication token missing' },
        { status: 401 }
      );
    }

    try {
      const decoded = await jose.jwtVerify(token, secret);

      (req as any).user = decoded;
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  const session = await AuthService.isSessionValid();
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
