import { Event } from '../../../entities/event.entity';
import { EventSpotlight } from '../../../entities/event_spotlight.entity';
import { EventSpotlightRequest } from '../request/event_spotlight.request';
import { EventSpotlightResponse } from '../response/event_spotlight.response';

export class EventSpotlightConverter {
  static toEventSpotlight(request: EventSpotlightRequest): EventSpotlight {
    return new EventSpotlight({
      event: { idEvent: request.id_event } as Event,
      start_date: request.start_date,
      end_date: request.end_date,
    });
  }

  static toEventSpotlightResponse(
    entity: EventSpotlight,
  ): EventSpotlightResponse {
    return new EventSpotlightResponse({
      idEventSpotlight: entity.idEventSpotlight,
      idEvent: entity.event?.idEvent,
      start_date: entity.start_date,
      end_date: entity.end_date,
    });
  }

  static toListEventSpotlightResponse(
    lista: EventSpotlight[],
  ): EventSpotlightResponse[] {
    return lista.map((item) => this.toEventSpotlightResponse(item));
  }
}
