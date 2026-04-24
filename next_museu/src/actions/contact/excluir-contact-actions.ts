'use server';

import { getServerDictionary } from '../../lib/get-dictionary';
import { ContactResponse } from '../../schemas/contact-schema';
import { ContactService } from '../../service/connection/ContactService';
import { ApiResponse } from '../../type/api';

export async function excluirContactAction(
  prevState: ApiResponse<ContactResponse>,
  payload: {
    idContact: number | string;
    url: string;
  },
): Promise<ApiResponse<ContactResponse>> {
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
    const contactService = new ContactService(payload.url);

    const result = await contactService.excluir(payload.idContact);

    return {
      status: result.status || 201,
      mensagem: result.mensagem || dict.app.endpoint.api_success,
      success: true,
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
    } as ApiResponse<ContactResponse> & { isNetworkError: boolean };
  }
}
