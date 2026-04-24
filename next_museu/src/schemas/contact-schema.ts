import * as z from 'zod';
import { DictionaryType } from '../type/type';

export const getContactSchema = (dict: DictionaryType) => {
  const { validation } = dict.contact;
  return z.object({
    idContact: z.number().int().positive().optional(),
    firstName: z
      .string()
      .min(2, { message: validation.invalidMinFirstName })
      .max(100, { message: validation.invalidMaxFirstName }),
    lastName: z
      .string()
      .min(2, { message: validation.invalidMinLastName })
      .max(100, { message: validation.invalidMaxLastName }),
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ''))
      .pipe(
        z
          .string()
          .min(10, { message: validation.invalidMinPhone })
          .max(11, { message: validation.invalidMaxPhone }),
      ),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .check(z.email({ message: validation.invalidEmail })),
    message: z
      .string()
      .min(10, { message: validation.invalidMinMessage })
      .min(250, { message: validation.invalidMaxMessage }),
    agreedToPrivacy: z.literal(false, {
      message: validation.invalidAgreedToPrivacy,
    }),
    status: z.number(),
  });
};

export const getContactCreateFormSchema = (dict: DictionaryType) => {
  const { validation } = dict.contact;
  return z.object({
    firstName: z
      .string()
      .min(2, { message: validation.invalidMinFirstName })
      .max(100, { message: validation.invalidMaxFirstName }),
    lastName: z
      .string()
      .min(2, { message: validation.invalidMinLastName })
      .max(100, { message: validation.invalidMaxLastName }),
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ''))
      .pipe(
        z
          .string()
          .min(10, { message: validation.invalidMinPhone })
          .max(11, { message: validation.invalidMaxPhone }),
      ),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .check(z.email({ message: validation.invalidEmail })),
    message: z
      .string()
      .min(10, { message: validation.invalidMinMessage })
      .min(250, { message: validation.invalidMaxMessage }),
    agreedToPrivacy: z.literal(false, {
      message: validation.invalidAgreedToPrivacy,
    }),
    status: z.number(),
  });
};

export const getContactCreateSchema = (dict: DictionaryType) =>
  getContactCreateFormSchema(dict);

export type ContactCreate = z.infer<
  ReturnType<typeof getContactCreateFormSchema>
>;

export const getContactUpdateSchema = (dict: DictionaryType) =>
  getContactSchema(dict).partial();

export type ContactUpdate = z.infer<ReturnType<typeof getContactUpdateSchema>>;

export const ContactResponseSchema = z.object({
  idContact: z.number().int().positive().optional(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  message: z.string(),
  agreedToPrivacy: z.literal(false),
  status: z.number(),
});

export type ContactResponse = z.infer<typeof ContactResponseSchema>;
