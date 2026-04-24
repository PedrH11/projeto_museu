import { EventService } from '../../service/connection/EventService';
import { getResource } from '../../service/connection/ResourceService';
import { ApiResponse } from '../../type/api';
import { CalendarEvent } from '../../type/type';

export async function listarEventosAction(
  search?: string,
  startDate?: string,
  endDate?: string,
): Promise<ApiResponse<CalendarEvent[]>> {
  const resources = await getResource();
  const endpoint = resources.find(
    (r) => r.name === 'events' && !r.endpoint.includes(':id'),
  )?.endpoint;
  if (!endpoint) {
    throw new Error('Endpoint de evento não encontrado no Resource Provider.');
  }

  const eventService = new EventService(endpoint);
  const param = {
    search,
    startDate,
    endDate,
  };

  const data = await eventService.listarEvents(param);
  if (!data) {
    return {
      status: 404,
      timestamp: new Date().toISOString(),
      path: '',
      metodo: 'GET',
    };
  }
  return data;
}
