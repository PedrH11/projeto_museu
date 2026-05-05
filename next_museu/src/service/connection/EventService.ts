import { http } from '../../lib/http';
import { EventResponse } from '../../schemas/event.schemas';
import { ApiResponse, SearchParams } from '../../type/api';
import { ConnectionService } from './ConnectionService';

export class EventService extends ConnectionService<EventResponse> {
  constructor(ENTITY: string) {
    super(ENTITY);
  }

  async listarEvents(params: SearchParams): Promise<ApiResponse<EventResponse[]>> {
    const response = await http.get(this.url, { params, ...this.config });
    return response.data;
  }
}
