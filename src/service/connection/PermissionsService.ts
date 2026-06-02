import { http } from '../../lib/http';
import {
  PermissionsCreate,
  PermissionsMatrizCreate,
  PermissionsResponse,
  PermissionsUpdate,
} from '../../schemas/permissions-schemas';
import { ApiResponse } from '../../type/api';
import { ConnectionService } from './ConnectionService';

export class PermissionsService extends ConnectionService<
  PermissionsResponse,
  PermissionsCreate,
  PermissionsUpdate
> {
  constructor(ENTITY: string) {
    super(ENTITY);
  }

  async sync(
    roleId: number,
    data: PermissionsMatrizCreate[],
  ): Promise<ApiResponse<PermissionsResponse>> {
    const response = await http.post<ApiResponse<PermissionsResponse>>(
      `${this.url}/${roleId}`,
      data,
    );
    return response.data;
  }
}
