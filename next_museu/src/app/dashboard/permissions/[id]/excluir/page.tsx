import { notFound, redirect } from 'next/navigation';
import { ExcluirPermissions } from '../../../../../components/permissions/excluir-permissions';
import { PermissionsResponse } from '../../../../../schemas/permissions-schemas';
import { PermissionsService } from '../../../../../service/connection/PermissionsService';
import { getResource } from '../../../../../service/connection/RecursosService';
import { ApiResponse } from '../../../../../type/api';


async function getPorId(id: string): Promise<ApiResponse<PermissionsResponse>> {
  let endpoint: string | undefined;

  try {
    const resources = await getResource();

    endpoint = resources
      .find((r) => r.name === 'permissions' && r.endpoint.includes(':id'))
      ?.endpoint.replace('/:id', '');
  } catch (error) {
    const apiError = error as ApiResponse<never> & { isNetworkError?: boolean };
    if (apiError.isNetworkError || apiError.status === 503) {
      redirect('/status/offline');
    }
  }

  if (!endpoint) {
    redirect('/status/offline');
  }

  try {
    const permissionsService = new PermissionsService(endpoint);
    const data = await permissionsService.porId(id);
    return data;
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) throw error;
    const apiError = error as ApiResponse<never> & { isNetworkError?: boolean };

    if (apiError.isNetworkError || apiError.status === 503) {
      redirect('/status/offline');
    }

    return apiError;
  }
}

export default async function PermissionsExcluir({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPorId(id);
  if (!result.dados) {
    notFound();
  }
  return <ExcluirPermissions result={result} idPermissions={id} />;
}
