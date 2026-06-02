import z from 'zod';
import { Action } from '../lib/action.enum';
import { Possession } from '../lib/possession.enum';
import { DictionaryType } from '../type/type';
import { ResourcesResponseSchema } from './resources-schemas';
import { RolesResponseSchema } from './roles-schemas';

export const getPermissionsSchema = (dict: DictionaryType) => {
  const { validation } = dict.permissions;
  return z.object({
    idPermissions: z.number().int().positive().optional(),

    roleId: z.number({ message: validation.roleId }).int(),

    nomeRoles: z.string(),

    resourceId: z.number({ message: validation.resourceId }).int(),

    nomeResources: z.string(),

    action: z.enum(Object.values(Action) as [string, ...string[]], {
      message: validation.action,
    }),

    possession: z.enum(Object.values(Possession) as [string, ...string[]], {
      message: validation.possession,
    }),

    role: RolesResponseSchema.optional().nullable(),

    resource: ResourcesResponseSchema.optional().nullable(),
  });
};

//para gravar a matriz de permissões 
export const getPermissionsMatrizSchema = (dict: DictionaryType) => {
  const { validation } = dict.permissions;
  return z.object({
    idPermissions: z.number().int().positive().optional(),

    roleId: z.number({ message: validation.roleId }).int(),

    resourceId: z.number({ message: validation.resourceId }).int(),

    action: z.enum(Object.values(Action) as [string, ...string[]], {
      message: validation.action,
    }),

    possession: z.enum(Object.values(Possession) as [string, ...string[]], {
      message: validation.possession,
    }),

    
  });
};

export type PermissionsMatrizCreate = z.infer<
  ReturnType<typeof getPermissionsMatrizSchema>
>;

export type PermissionsCreate = z.infer<
  ReturnType<typeof getPermissionsSchema>
>;

export type PermissionsUpdate = z.infer<
  ReturnType<typeof getPermissionsSchema>
>;

export type PermissionsDelete = z.infer<
  ReturnType<typeof getPermissionsSchema>
>;

export type PermissionsConsultar = z.infer<
  ReturnType<typeof getPermissionsSchema>
>;

export const PermissionsResponseSchema: z.ZodType<any> = z.object({
  idPermissions: z.number().int().positive().optional(),

  roleId: z.number().int(),

  nomeRoles: z.string(),

  role: RolesResponseSchema.optional().nullable(),

  resource: ResourcesResponseSchema.optional().nullable(),

  resourceId: z.number().int(),

  nomeResources: z.string(),

  action: z
    .enum(Object.values(Action) as [string, ...string[]])
    .default(Action.READ),

  possession: z
    .enum(Object.values(Possession) as [string, ...string[]])
    .default(Possession.ANY),
});

export type PermissionsResponse = z.infer<typeof PermissionsResponseSchema>;
