"use server";

import { revalidatePath } from "next/cache";

import { getServerDictionary } from "../../lib/get-dictionary";
import {
  PermissionsMatrizCreate,
  PermissionsResponse,
} from "../../schemas/permissions-schemas";
import { PermissionsService } from "../../service/connection/PermissionsService";
import { ApiResponse } from "../../type/api";

export async function atualizarPermissionsMatrizAction(
  prevState: ApiResponse<PermissionsResponse>,
  payload: {
    roleId: number;
    permissionsMatrizCreate: PermissionsMatrizCreate[];
    url: string;
  },
): Promise<ApiResponse<PermissionsResponse>> {
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

    const result = await permissionsService.sync(
      payload.roleId,
      payload.permissionsMatrizCreate,
    );

    if (result.status >= 200 && result.status < 300) {
      revalidatePath("/dashboard/permissions");
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
