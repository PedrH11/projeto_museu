import { http } from '../../lib/http';
import { ApiResponse } from '../../type/api';
import { Resource } from '../providers/resource-providers';

export interface HttpError {
  status: number;
  mensagem: string;
  erro: string;
  isNetworkError?: boolean;
}

export const getResource = async (): Promise<Resource[]> => {
  try {
    const response = await http.get<Resource[]>('/api/v1/resources-server');
    return response.data || [];
  } catch (error) {
    const err = error as ApiResponse<unknown> & { isNetworkError?: boolean };
    if (err.isNetworkError || err.status === 503) {
      console.warn(
        'HATEOAS Resources: Servidor offline. Retornando lista vazia.',
      );
      return [];
    }
    return [];
  }
};
