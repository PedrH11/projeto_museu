'use server';

import { revalidatePath } from 'next/cache';

import { getServerDictionary } from '../../lib/get-dictionary';
import {
  ResourcesResponse,
  ResourcesUpdate,
} from '../../schemas/resources-schemas';
import { ResourcesService } from '../../service/connection/ResourcesService';
import { ApiResponse } from '../../type/api';

export async function atualizarResourcesAction(
  prevState: ApiResponse<ResourcesResponse>,
  payload: {
    id: number | string;
    resourcesUpdate: ResourcesUpdate;
    url: string;
  },
): Promise<ApiResponse<ResourcesResponse>> {
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
    const resourcesService = new ResourcesService(payload.url);

    const result = await resourcesService.atualizar(
      payload.id,
      payload.resourcesUpdate,
    );

    if (result.status >= 200 && result.status < 300) {
      revalidatePath('/dashboard/resources');
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
    } as ApiResponse<ResourcesResponse> & { isNetworkError: boolean };
  }
}
