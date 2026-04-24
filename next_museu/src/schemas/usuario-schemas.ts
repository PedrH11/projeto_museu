import z from 'zod';
import { DictionaryType } from '../type/type';

/* eslint-disable @typescript-eslint/no-unused-vars */
const getUsuarioSchema = (dict: DictionaryType) => {
  const { validation } = dict.usuario;
  return z.object({
    idUsuario: z.number().int().positive().optional(),
    username: z
      .string()
      .min(8, {
        message: validation.invalidMinUsername,
      })
      .max(100, {
        message: validation.invalidMaxUsername,
      }),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: validation.invalidEmail }),

    imagePath: z.string().optional(),
  });
};

/* ================= CREATE ================= */

export const getUsuarioCreateFormSchema = (dict: DictionaryType) => {
  const { validation } = dict.usuario;
  return z
    .object({
      firstName: z
        .string()
        .min(8, {
          message: validation.invalidMinFirstname,
        })
        .max(100, {
          message: validation.invalidMaxFirstname,
        }),
      lastName: z
        .string()
        .min(8, {
          message: validation.invalidMinLastname,
        })
        .max(100, {
          message: validation.invalidMaxLastname,
        }),
      username: z
        .string()
        .min(8, {
          message: validation.invalidMinUsername,
        })
        .max(100, {
          message: validation.invalidMaxUsername,
        }),
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
          message: validation.invalidCaracterPassword,
        })
        .regex(/(?=.*[0-9])/, {
          message: validation.invalidNumberDigit,
        }),
      confirmPassword: z.string(),
      imagePath: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: validation.passwordsMustMatch,
      path: ['confirmSenha'],
    });
};

export type UsuarioCreateForm = z.infer<
  ReturnType<typeof getUsuarioCreateFormSchema>
>;

export const getUsuarioCreateSchema = (dict: DictionaryType) =>
  getUsuarioCreateFormSchema(dict).transform(
    ({ confirmPassword, ...rest }) => rest,
  );

export type UsuarioCreate = z.infer<ReturnType<typeof getUsuarioCreateSchema>>;

/* ================= UPDATE ================= */

export const getUsuarioUpdateSchema = (dict: DictionaryType) =>
  getUsuarioSchema(dict).partial();

export type UsuarioUpdate = z.infer<ReturnType<typeof getUsuarioUpdateSchema>>;

export type UsuarioDelete = z.infer<ReturnType<typeof getUsuarioUpdateSchema>>;

/* ================= UPDATE SENHA ================= */

export const UsuarioUpdateSenhaSchema = (dict: DictionaryType) => {
  const { validation } = dict.usuario;
  return z
    .object({
      password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: validation.passwordsMustMatch,
      path: ['confirmPassword'],
    })
    .transform(({ confirmPassword: _confirmPassword, ...rest }) => rest);
};

export type UsuarioUpdateSenha = z.infer<
  ReturnType<typeof UsuarioUpdateSenhaSchema>
>;

/* ================= LIST ================= */

export type UsuarioList = z.infer<typeof getUsuarioSchema>; // usando para consulta

/* ================= Consultar ================= */

export type UsuarioConsultar = z.infer<
  ReturnType<typeof getUsuarioUpdateSchema>
>; // usando para consulta

/* ================= USUÁRIO RESPONSE - RESPOSTA DA API  ================= */

export const UsuarioResponseSchema = z.object({
  idUsuario: z.number().int().positive().optional(),

  username: z.string(),

  email: z.string(),

  active: z.boolean(),

  imagePath: z.string().nullable().optional(),
});

export type UsuarioResponse = z.infer<typeof UsuarioResponseSchema>;

/* ################################################################################# */
