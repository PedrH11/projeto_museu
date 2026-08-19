import { Expose } from 'class-transformer';

export class EventBookingGroupResponse {
  @Expose()
  id_booking!: number;

  @Expose()
  id_group!: number;

  @Expose()
  attending_students!: string[];
}
