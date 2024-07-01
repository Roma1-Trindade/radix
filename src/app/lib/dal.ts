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
    return null;
  }
});

export const getSensorData = cache(async () => {
  try {
    const data = await prisma.sensorData.findMany({});

    return data;
  } catch (error) {
    return [];
  }
});
