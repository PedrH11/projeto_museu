import { z } from 'zod';
import { DictionaryType } from '../type/type';

export const getVerifyEmailSchema = (dict: DictionaryType) => {
  const { validation } = dict.auth;
  return z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .check(z.email({ message: validation.invalidEmail })),
  });
};

export type VerifyEmailCreate = z.infer<
  ReturnType<typeof getVerifyEmailSchema>
>;

export const VerifyEmailResponseSchema = z.object({
  email: z.string(),
});

export type VerifyEmailResponse = z.infer<typeof VerifyEmailResponseSchema>;
