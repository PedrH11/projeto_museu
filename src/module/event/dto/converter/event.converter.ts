import { GenericConverter } from '../../../../commons/converter/converter.commons';
import { Event } from '../../entities/event.entity';
import { EventRequest } from '../request/event.request';
import { EventResponse } from '../response/event.response';

export class EventConverter {
  static toEvent(eventRequest: EventRequest): Event {
    return GenericConverter.toEntity(Event, eventRequest);
  }

  static toEventResponse(event: Event): EventResponse {
    return GenericConverter.toResponse(EventResponse, event);
  }

  static toListEventResponse(listaEvent: Event[]): EventResponse[] {
    return GenericConverter.toListResponse(EventResponse, listaEvent);
  }
}
