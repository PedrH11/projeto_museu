import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './controller/event.controller';

import { Event } from './entities/event.entity';
import { EventService } from './service/event.service';

import { EventBooking } from './entities/eventbooking.entity';
import { EventBookingGroup } from './entities/eventbooking-group.entity';
import { EventBookingGroupController } from './controller/eventbooking-group.controller';
import { EventBookingGroupService } from './service/eventbooking-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventBooking, EventBookingGroup])],
  controllers: [EventController, EventBookingGroupController],
  providers: [EventService, EventBookingGroupService],
})
export class EventModule {}
