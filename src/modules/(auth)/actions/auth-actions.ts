'use server';
import {
  FormState,
  loginFormSchema,
  registerFormSchema,
} from '@/app/lib/definitions';
import { prisma } from '@/app/lib/prisma';
import * as bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import AuthService from '../services/auth-service';

export async function createAccount(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  'use server';

  // 1. Validate form fields
  const validatedFields = registerFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirm: formData.get('confirm'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;

  // 3. Check if the user's email already exists
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    return {
      message: 'Email already exists, please use a different email or login.',
    };
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Provider's API
  const data = await prisma.user.create({
    data: {
      password: hashedPassword,
      email,
    },
  });
  const user = data;

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // 4. Create a session for the user
  await AuthService.createSessionToken({
    userId: user.id,
    email: user.email,
  });

  redirect('/home');
}

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  'use server';

  const validatedFields = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const errorMessage = { message: 'Invalid login credentials.' };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  const user = await prisma.user.findFirst({
    where: { email: validatedFields.data.email },
  });

  // If user is not found, return early
  if (!user) {
    return errorMessage;
  }
  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.password
  );

  // If the password does not match, return early
  if (!passwordMatch) {
    return errorMessage;
  }

  // 4. If login successful, create a session for the user and redirect

  await AuthService.createSessionToken({
    userId: user.id,
    email: user.email,
  });

  redirect('/home');
}
