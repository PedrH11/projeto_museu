import z from 'zod';
import { DictionaryType } from '../type/type';

export const getResourcesSchema = (dict: DictionaryType) => {
  const { validation } = dict.resources;
  return z.object({
    idResources: z.number().int().positive(),
    nomeResources: z
      .string()
      .min(8, {
        message: validation.invalidMinNameResources,
      })
      .max(100, {
        message: validation.invalidMaxNameResources,
      }),
  });
};

export const ResourcesResponseSchema = z.object({
  idResources: z.number().int().positive(),
  nomeResources: z.string(),
  //permissions: z.array(PermissionsResponseSchema).default([]),
});

const AcoesEnum = z.enum([
  'create',
  'read',
  'update',
  'delete',
  'view',
  'edit',
]);

export const ResourcesMatrizSchema = z.object({
  idResources: z.number().int().positive(),
  nomeResources: z.string(),
  roleId: z.number().int().positive(),
  nomeRole: z.string(),
  acoesAtivas: z.array(AcoesEnum).default([]),
});

export type ResourcesCreate = z.infer<ReturnType<typeof getResourcesSchema>>;

export type ResourcesUpdate = z.infer<ReturnType<typeof getResourcesSchema>>;

export type ResourcesDelete = z.infer<ReturnType<typeof getResourcesSchema>>;

export type ResourcesConsultar = z.infer<ReturnType<typeof getResourcesSchema>>;

export type ResourcesResponse = z.infer<typeof ResourcesResponseSchema>;

export type ResourcesMatrizResponse = z.infer<typeof ResourcesMatrizSchema>;
