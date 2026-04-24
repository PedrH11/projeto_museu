import { z } from 'zod';
import { DictionaryType } from '../type/type';

export const getNewPasswordSchema = (dict: DictionaryType) => {
  const { validation } = dict.auth;

  const passwordBase = z
    .string()
    .min(8, { message: validation.invalidMinPassword })
    .max(250, { message: validation.invalidMaxPassword })
    .regex(/(?=.*[a-zA-Z])/, { message: validation.invalidCharacterPassword })
    .regex(/(?=.*[0-9])/, { message: validation.invalidNumberDigit });

  return z
    .object({
      password: passwordBase,
      confirmPassword: passwordBase, // Reutiliza a mesma regra
    })

    .refine((data) => data.password === data.confirmPassword, {
      message: validation.passwordsMustMatch,
      path: ['confirmPassword'],
    });
};

export type NewPasswordCreate = z.infer<
  ReturnType<typeof getNewPasswordSchema>
>;

export const NewPasswordResponseSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export type NewPasswordResponse = z.infer<typeof NewPasswordResponseSchema>;
