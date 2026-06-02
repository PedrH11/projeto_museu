'use server';

import { revalidatePath } from 'next/cache';

import { getServerDictionary } from '../../lib/get-dictionary';
import { UsuarioResponse, UsuarioUpdate } from '../../schemas/usuario-schemas';
import { UsuarioService } from '../../service/connection/UsuarioService';
import { ApiResponse } from '../../type/api';

export async function atualizarUsuarioAction(
  prevState: ApiResponse<UsuarioResponse>,
  payload: {
    id: number | string;
    usuarioUpdate: UsuarioUpdate;
    url: string;
  },
): Promise<ApiResponse<UsuarioResponse>> {
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
    const usuarioService = new UsuarioService(payload.url);

    const result = await usuarioService.atualizar(
      payload.id,
      payload.usuarioUpdate,
    );

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
    } as ApiResponse<UsuarioResponse> & { isNetworkError: boolean };
  }
}
