import { redirect } from 'next/navigation';
import PermissionsMatriz from '../../../../../components/permissions/permissions-matriz';
import { ResourcesMatrizResponse } from '../../../../../schemas/resources-schemas';
import { getResource } from '../../../../../service/connection/RecursosService';
import { ResourcesService } from '../../../../../service/connection/ResourcesService';
import { ApiResponse, PageResponse } from '../../../../../type/api';

async function listarResources({
  page,
  pageSize,
  field,
  order,
  search,
  id,
}: {
  page?: string;
  pageSize?: string;
  field?: string;
  order?: string;
  search?: string;
  id: string; // ID é obrigatório aqui
}): Promise<ApiResponse<PageResponse<ResourcesMatrizResponse>>> {
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
    const recursosService = new ResourcesService(endpoint);
    pageSize='10';
    const param = {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      field,
      order,
      search,
    };

    const data = await recursosService.listarMatriz(param, Number(id));

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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    field?: string;
    order?: string;
    search?: string;
  }>;
}) {
  const { id } = await params;
  const sParams = await searchParams;
  const resources = await listarResources({ ...sParams, id });
  return <PermissionsMatriz resources={resources} />;
}
