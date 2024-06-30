import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

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

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
