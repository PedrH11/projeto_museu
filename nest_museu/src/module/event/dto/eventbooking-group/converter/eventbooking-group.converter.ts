import { GenericConverter } from '../../../../../commons/converter/converter.commons';
import { EventBookingGroup } from '../../../entities/eventbooking-group.entity';
import { CreateEventBookingGroupDto } from '../request/create-eventbooking-group.dto';
import { EventBookingGroupResponse } from '../response/eventbooking-group.response';

export class EventBookingGroupConverter {
  static toEntity(request: CreateEventBookingGroupDto): EventBookingGroup {
    return GenericConverter.toEntity(EventBookingGroup, request);
  }

  static toResponse(entity: EventBookingGroup): EventBookingGroupResponse {
    return GenericConverter.toResponse(EventBookingGroupResponse, entity);
  }

  static toListResponse(
    entities: EventBookingGroup[],
  ): EventBookingGroupResponse[] {
    return GenericConverter.toListResponse(EventBookingGroupResponse, entities);
  }
}
