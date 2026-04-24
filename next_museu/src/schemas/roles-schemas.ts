import z from 'zod';
import { DictionaryType } from '../type/type';


export const getRolesSchema = (dict: DictionaryType) => {
  const { validation } = dict.roles;
  return z.object({
    idRoles: z.number().int().positive().optional(),
    nomeRoles: z
      .string()
      .min(8, {
        message: validation.invalidMinNameRole,
      })
      .max(100, {
        message: validation.invalidMaxNameRole,
      }),
  });
};

export type RolesCreate = z.infer<ReturnType<typeof getRolesSchema>>;

export type RolesUpdate = z.infer<ReturnType<typeof getRolesSchema>>;

export type RolesDelete = z.infer<ReturnType<typeof getRolesSchema>>;

export type RolesConsultar = z.infer<ReturnType<typeof getRolesSchema>>;

export const RolesResponseSchema = z.object({
  idRoles: z.number().int().positive().optional(),
  nomeRoles: z.string(),
});

export type RolesResponse = z.infer<typeof RolesResponseSchema>;
