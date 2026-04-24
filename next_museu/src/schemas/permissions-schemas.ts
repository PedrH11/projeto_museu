import z from 'zod';
import { Action } from '../lib/action.enum';
import { Possession } from '../lib/possession.enum';
import { DictionaryType } from '../type/type';

export const getPermissionSchema = (dict: DictionaryType) => {
  const { validation } = dict.permissions;
  return z.object({
    idPermission: z.number().int().positive().optional(),

    roleId: z.number({ message: validation.roleId }).int(),

    resourceId: z.number({ message: validation.resourceId }).int(),

    action: z
      .enum(Object.values(Action) as [string, ...string[]], {
        message: validation.action,
      })
      .default(Action.READ),

    possession: z
      .enum(Object.values(Possession) as [string, ...string[]], {
        message: validation.possession,
      })
      .default(Possession.ANY),
  });
};

export type PermissionsCreate = z.infer<ReturnType<typeof getPermissionSchema>>;

export type PermissionsUpdate = z.infer<ReturnType<typeof getPermissionSchema>>;

export type PermissionsDelete = z.infer<ReturnType<typeof getPermissionSchema>>;

export type PermissionsConsultar = z.infer<
  ReturnType<typeof getPermissionSchema>
>;

export const PermissionsResponseSchema = z.object({
  idPermission: z.number().int().positive().optional(),

  roleId: z.number().int(),

  roleName: z.string(),

  resourceId: z.number().int(),

  resourceName: z.string(),

  action: z
    .enum(Object.values(Action) as [string, ...string[]])
    .default(Action.READ),

  possession: z
    .enum(Object.values(Possession) as [string, ...string[]])
    .default(Possession.ANY),
});

export type PermissionsResponse = z.infer<typeof PermissionsResponseSchema>;
