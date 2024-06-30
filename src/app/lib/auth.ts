'use server';

import bcrypt from 'bcryptjs';
import {
  FormState,
  LoginFormSchema,
  RegisterFormSchema,
  loginFormSchema,
  registerFormSchema,
} from './definitions';
import { prisma } from './prisma';
import { createSession, deleteSession } from './session';

export async function signUp(formData: RegisterFormSchema): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = registerFormSchema.safeParse({
    email: formData.email,
    password: formData.password,
    confirm: formData.confirm,
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
  console.log('data', data);
  const user = data;

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // 4. Create a session for the user
  const userId = user.id.toString();
  await createSession(userId);
}

export async function login(formData: LoginFormSchema): Promise<any> {
  // 1. Validate form fields
  const validatedFields = loginFormSchema.safeParse({
    email: formData.email,
    password: formData.password,
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

  console.log('User', user);

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
  const userId = user.id.toString();
  await createSession(userId);
}

export async function logout() {
  deleteSession();
}
