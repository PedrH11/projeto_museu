import { AxiosRequestConfig } from 'axios';
import { http } from '../../lib/http';
import { ApiResponse, PageResponse, SearchParams } from '../../type/api';

export type Id = string | number;

export class ConnectionService<T, TCreate = T, TUpdate = T> {
  constructor(
    readonly url: string,
    readonly config?: AxiosRequestConfig,
  ) {}

  async listar(params: SearchParams): Promise<ApiResponse<PageResponse<T>>> {
    const response = await http.get(this.url, { params, ...this.config });
    return response.data;
  }

  async porId(id: Id): Promise<ApiResponse<T>> {
    const response = await http.get<ApiResponse<T>>(`${this.url}/${id}`, {
      ...this.config,
    });
    return response.data;
  }

  async salvar(body: TCreate): Promise<ApiResponse<T>> {
    const response = await http.post<ApiResponse<T>>(this.url, body, {
      ...this.config,
    });
    return response.data;
  }

  async atualizar(id: Id, body: TUpdate): Promise<ApiResponse<T>> {
    const response = await http.put<ApiResponse<T>>(`${this.url}/${id}`, body, {
      ...this.config,
    });
    return response.data;
  }

  async excluir(id: Id): Promise<ApiResponse<T>> {
    const response = await http.delete<ApiResponse<T>>(`${this.url}/${id}`, {
      ...this.config,
    });
    return response.data;
  }
}
