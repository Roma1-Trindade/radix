import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirm: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        confirm?: string[];
      };
      message?: string;
    }
  | undefined;
