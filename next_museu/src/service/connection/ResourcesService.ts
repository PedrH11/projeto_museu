import { http } from '../../lib/http';
import {
  ResourcesCreate,
  ResourcesMatrizResponse,
  ResourcesResponse,
  ResourcesUpdate,
} from '../../schemas/resources-schemas';
import { ApiResponse, PageResponse, SearchParams } from '../../type/api';
import { ConnectionService } from './ConnectionService';

export class ResourcesService extends ConnectionService<
  ResourcesResponse,
  ResourcesCreate,
  ResourcesUpdate
> {
  constructor(ENTITY: string) {
    super(ENTITY);
  }

  async listarMatriz(
    params: SearchParams,
    roleId: number,
  ): Promise<ApiResponse<PageResponse<ResourcesMatrizResponse>>> {
    const response = await http.get(`${this.url}/matriz/${roleId}`, {
      params,
      ...this.config,
    });
    return response.data;
  }
}
