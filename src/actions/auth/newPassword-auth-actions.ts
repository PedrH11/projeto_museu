'use server';

import { getServerDictionary } from '../../lib/get-dictionary';
import { NewPasswordResponse } from '../../schemas/new-passward-schema';
import { AuthService } from '../../service/connection/AuthService';
import { ApiResponse } from '../../type/api';

export async function newPasswordAuthAction(
  prevState: ApiResponse<NewPasswordResponse>,
  payload: {
    newPasswordRequest: {
      password: string;
      confirmPassword: string;
    };
    url: string;
  },
): Promise<ApiResponse<NewPasswordResponse>> {
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
    const authService = new AuthService(payload.url);

    const result = await authService.newPassword(payload.newPasswordRequest);

    return {
      status: result.status || 201,
      mensagem: result.mensagem || dict.app.endpoint.api_success,
    };
  } catch (error: any) {
    const apiError = error as ApiResponse<never> & { isNetworkError?: boolean };

    return {
      status: apiError.status || 503,
      mensagem: apiError.mensagem || dict.app.endpoint.api_message,
      erro: apiError.erro || dict.app.endpoint.api_error,
      errors: apiError.dados || {},
      timestamp: new Date().toISOString(),
      isNetworkError: true,
    } as ApiResponse<NewPasswordResponse> & { isNetworkError: boolean };
  }
}
