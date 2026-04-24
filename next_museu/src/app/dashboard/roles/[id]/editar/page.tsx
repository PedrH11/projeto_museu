import { notFound, redirect } from 'next/navigation';
import { AtualizarRoles } from '../../../../../components/roles/atualizar-roles';
import { RolesResponse } from '../../../../../schemas/roles-schemas';
import { getResource } from '../../../../../service/connection/ResourceService';
import { RolesService } from '../../../../../service/connection/RolesService';
import { ApiResponse } from '../../../../../type/api';

async function getPorId(id: string): Promise<ApiResponse<RolesResponse>> {
  let endpoint: string | undefined;

  try {
    const resources = await getResource();

    endpoint = resources
      .find((r) => r.name === 'roles' && r.endpoint.includes(':id'))
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
    const rolesService = new RolesService(endpoint);
    const data = await rolesService.porId(id);
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

export default async function RolesAtualizar({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPorId(id);
  if (!result.dados) {
    notFound();
  }
  return <AtualizarRoles result={result} idRoles={id} />;
}
