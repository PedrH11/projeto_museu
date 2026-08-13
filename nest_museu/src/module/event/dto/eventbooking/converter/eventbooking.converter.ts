import { GenericConverter } from '../../../../commons/converter/converter.commons';
import { EventBooking } from '../../entities/eventbooking.entity';
import { EventBookingRequest } from '../request/eventbooking.request';
import { EventBookingResponse } from '../response/eventbooking.response';

export class EventBookingConverter {
  static toEventBooking(
    eventBookingRequest: EventBookingRequest,
  ): EventBooking {
    return GenericConverter.toEntity(EventBooking, eventBookingRequest);
  }

  static toEventBookingResponse(
    eventBooking: EventBooking,
  ): EventBookingResponse {
    return GenericConverter.toResponse(EventBookingResponse, eventBooking);
  }

  static toListEventBookingResponse(
    listaEventBooking: EventBooking[],
  ): EventBookingResponse[] {
    return GenericConverter.toListResponse(
      EventBookingResponse,
      listaEventBooking,
    );
  }
}
