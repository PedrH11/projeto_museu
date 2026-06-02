import { redirect } from 'next/navigation';
import PermissionsMatriz from '../../../../../components/permissions/permissions-matriz';
import { ResourcesResponse } from '../../../../../schemas/resources-schemas';
import { RecursosService } from '../../../../../service/connection/RecursosService';
import { getResource } from '../../../../../service/connection/ResourceService';
import { ApiResponse, PageResponse } from '../../../../../type/api';

async function listarResources(
  page?: string,
  pageSize?: string,
  field?: string,
  order?: string,
  search?: string,
): Promise<ApiResponse<PageResponse<ResourcesResponse>>> {
  let endpoint: string | undefined;

  try {
    const resources = await getResource();
    endpoint = resources.find(
      (r) => r.name === 'resources' && !r.endpoint.includes(':id'),
    )?.endpoint;
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
    const recursosService = new RecursosService(endpoint);

    const param = {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      field,
      order,
      search,
    };

    const data = await recursosService.listar(param);

    if (!data || !data.dados) {
      return {
        status: 400,
        timestamp: new Date().toISOString(),
        path: '',
        metodo: 'GET',
        dados: {
          content: [],
          totalPages: 0,
          totalElements: 0,
          pageSize: 5,
          page: 1,
          lastPage: 0,
        },
      };
    }
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

export default async function MatrizPermission({
  params,
}: {
  params: Promise<{ roles: string }>;
}) {
  const { roles } = await params;
  const resources = await listarResources();

  return <PermissionsMatriz nomeRole={roles} resources={resources} />;
}
