import { notFound, redirect } from 'next/navigation';
import { ConsultarUsuario } from '../../../../../components/usuario/consultar-usuario';
import { UsuarioResponse } from '../../../../../schemas/usuario-schemas';
import { getResource } from '../../../../../service/connection/ResourceService';
import { UsuarioService } from '../../../../../service/connection/UsuarioService';
import { ApiResponse } from '../../../../../type/api';

async function getPorId(id: string): Promise<ApiResponse<UsuarioResponse>> {
  let endpoint: string | undefined;

  try {
    const resources = await getResource();

    endpoint = resources
      .find((r) => r.name === 'usuario' && r.endpoint.includes(':id'))
      ?.endpoint.replace(':id', id);
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
    const usuarioService = new UsuarioService(endpoint);
    const data = await usuarioService.porId(id);
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

export default async function UsuarioConsultar({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPorId(id);
  if (!result.dados) {
    notFound();
  }
  return <ConsultarUsuario result={result} />;
}
