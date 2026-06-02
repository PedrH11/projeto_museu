'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getServerDictionary } from '../../lib/get-dictionary';
import { LoginResponse } from '../../schemas/sigin-schemas';
import { AuthService } from '../../service/connection/AuthService';
import { ApiResponse } from '../../type/api';

export async function loginAuthAction(
  prevState: ApiResponse<LoginResponse>,
  payload: {
    loginRequest: {
      email: string;
      password: string;
    };
    url: string;
  },
): Promise<ApiResponse<LoginResponse>> {
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
    const siginService = new AuthService(payload.url);

    const result = await siginService.signIn(payload.loginRequest);

    if (result.status >= 200 && result.status < 300 && result.dados) {
      const cookieStore = await cookies();

      cookieStore.set('Authentication', result.dados.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
      revalidatePath('/dashboard');
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
    } as ApiResponse<LoginResponse> & { isNetworkError: boolean };
  }
}
