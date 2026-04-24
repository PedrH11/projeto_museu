import { z } from 'zod';
import { DictionaryType } from '../type/type';

export const getForgotPasswordSchema = (dict: DictionaryType) => {
  const { validation } = dict.auth;
  return z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .check(z.email({ message: validation.invalidEmail })),
  });
};

export type ForgotPasswordForm = z.infer<
  ReturnType<typeof getForgotPasswordSchema>
>;

export const ForgotPasswordSchema = z.object({
  email: z.string(),
});

export type ForgotPasswordResponse = z.infer<typeof ForgotPasswordSchema>;
