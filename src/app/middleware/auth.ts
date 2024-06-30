import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const authMiddleware = async (req: Request) => {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication token missing' },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    (req as any).user = decoded;
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
};
