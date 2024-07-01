import 'server-only';

import AuthService from '@/modules/(auth)/services/auth-service';
import { cache } from 'react';
import { prisma } from './prisma';

export const getUser = cache(async () => {
  const session = await AuthService.verifySession();

  if (!session) return null;

  try {
    const data = await prisma.user.findMany({
      where: { id: session.userId },
    });

    const user = data[0];

    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
