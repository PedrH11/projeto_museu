import { notFound, redirect } from 'next/navigation';
import { AtualizarResources } from '../../../../../components/resources/atualizar-resources';
import { ResourcesResponse } from '../../../../../schemas/resources-schemas';
import { getResource } from '../../../../../service/connection/RecursosService';
import { ResourcesService } from '../../../../../service/connection/ResourcesService';
import { ApiResponse } from '../../../../../type/api';

async function getPorId(id: string): Promise<ApiResponse<ResourcesResponse>> {
  let endpoint: string | undefined;

  try {
    const resources = await getResource();

    endpoint = resources
      .find((r) => r.name === 'resources' && r.endpoint.includes(':id'))
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
    const resourcesService = new ResourcesService(endpoint);
    const data = await resourcesService.porId(id);
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

export default async function ResourcesAtualizar({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPorId(id);
  if (!result.dados) {
    notFound();
  }
  return <AtualizarResources result={result} idResources={id} />;
}
