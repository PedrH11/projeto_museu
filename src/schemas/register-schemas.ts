import { z } from 'zod';
import { DictionaryType } from '../type/type';

export const getRegisterSchema = (dict: DictionaryType) => {
  const { validation } = dict.auth;
  return z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, { message: validation.invalidMinFirstName })
        .max(50, { message: validation.invalidMaxFirstName }),
      lastName: z
        .string()
        .trim()
        .min(2, { message: validation.invalidMinLastName })
        .max(50, { message: validation.invalidMaxLastName }),
      username: z
        .string()
        .toLowerCase()
        .trim()
        .min(3, { message: validation.invalidMinUserName })
        .max(50, { message: validation.invalidMaxUserName }),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .check(z.email({ message: validation.invalidEmail })),
      password: z
        .string()
        .min(8, {
          message: validation.invalidMinPassword,
        })
        .max(250, {
          message: validation.invalidMaxPassword,
        })
        .regex(/(?=.*[a-zA-Z])/, {
          message: validation.invalidCharacterPassword,
        })
        .regex(/(?=.*[0-9])/, {
          message: validation.invalidNumberDigit,
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: validation.passwordsMustMatch,
      path: ['confirmPassword'], // Isso faz o erro aparecer no campo confirmPassword, não no formulário inteiro
    });
};

export type RegisterCreate = z.infer<ReturnType<typeof getRegisterSchema>>;

export const RegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
});

export type RegisterResponse = z.infer<typeof RegisterSchema>;
