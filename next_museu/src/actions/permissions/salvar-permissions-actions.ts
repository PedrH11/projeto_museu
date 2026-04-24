'use server';

import { revalidatePath } from 'next/cache';
import { getServerDictionary } from '../../lib/get-dictionary';
import { RolesCreate, RolesResponse } from '../../schemas/roles-schemas';
import { RolesService } from '../../service/connection/RolesService';
import { ApiResponse } from '../../type/api';

export async function salvarRolesAction(
  prevState: ApiResponse<RolesResponse>,
  payload: {
    rolesCreate: RolesCreate;
    url: string;
  },
): Promise<ApiResponse<RolesResponse>> {
  const dict = await getServerDictionary();
  if (!payload.url) {
    return {
      status: 400,
      mensagem: dict.app.endpoint.message,
      erro: dict.app.endpoint.error,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const rolesService = new RolesService(payload.url);
    const result = await rolesService.salvar(payload.rolesCreate);

    if (result.status >= 200 && result.status < 300) {
      revalidatePath('/dashboard/usuario');
    }

    return result;
  } catch (error: any) {
    const apiError = error as ApiResponse<never> & { isNetworkError?: boolean };

    return {
      status: apiError.status || 503,
      mensagem: apiError.mensagem || dict.app.endpoint.api_message,
      erro: apiError.erro || dict.app.endpoint.api_error,
      errors: apiError.dados || {},
      timestamp: new Date().toISOString(),
      isNetworkError: true,
    } as ApiResponse<RolesResponse> & { isNetworkError: boolean };
  }
}
