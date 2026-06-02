'use server';

import { revalidatePath } from 'next/cache';

import { getServerDictionary } from '../../lib/get-dictionary';
import { PermissionsResponse } from '../../schemas/permissions-schemas';
import { RolesResponse } from '../../schemas/roles-schemas';
import { PermissionsService } from '../../service/connection/PermissionsService';
import { ApiResponse } from '../../type/api';

export async function excluirPermissionsAction(
  prevState: ApiResponse<PermissionsResponse>,
  payload: {
    id: number;
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
    const permissionsService = new PermissionsService(payload.url);

    const result = await permissionsService.excluir(payload.id);

    if (result.status >= 200 && result.status < 300) {
      revalidatePath('/dashboard/permissions');
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
    } as ApiResponse<PermissionsResponse> & { isNetworkError: boolean };
  }
}
