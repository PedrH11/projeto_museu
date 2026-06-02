import { notFound, redirect } from 'next/navigation';
import { ConsultarContact } from '../../../../../components/contact/consultar-contato';
import { ContactResponse } from '../../../../../schemas/contact-schema';
import { ContactService } from '../../../../../service/connection/ContactService';
import { getResource } from '../../../../../service/connection/RecursosService';
import { ApiResponse } from '../../../../../type/api';

async function getPorId(id: string): Promise<ApiResponse<ContactResponse>> {
  let endpoint: string | undefined;

  try {
    const resources = await getResource();

    endpoint = resources
      .find((r) => r.name === 'contact' && r.endpoint.includes(':id'))
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
    const contactService = new ContactService(endpoint);
    const data = await contactService.porId(id);
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

export default async function ContactAtualizar({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getPorId(id);
  if (!response.dados) {
    notFound();
  }
  return <ConsultarContact contact={response.dados} />;
}
