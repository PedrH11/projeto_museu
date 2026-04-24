import z from 'zod';
import { DictionaryType } from '../type/type';


export const getResourcesSchema = (dict: DictionaryType) => {
  const { validation } = dict.roles;
  return z.object({
    idResources: z.number().int().positive().optional(),
    nomeResources: z
      .string()
      .min(8, {
        message: validation.invalidMinNameRole,
      })
      .max(100, {
        message: validation.invalidMaxNameRole,
      }),
  });
};


export const ResourcesResponseSchema = z.object({
  idResources: z.number().int().positive().optional(),
  nomeResources: z.string(),
});

export type ResourcesResponse = z.infer<typeof ResourcesResponseSchema>;
