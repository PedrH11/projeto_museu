import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { EventBookingGroupService } from '../service/eventbooking-group.service';
import { CreateEventBookingGroupDto } from '../dto/eventbooking-group/request/create-eventbooking-group.dto';
import { UpdateEventBookingGroupDto } from '../dto/eventbooking-group/request/update-eventbooking-group.dto';

@Controller('event-booking-groups')
export class EventBookingGroupController {
  constructor(private readonly service: EventBookingGroupService) {}

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id_booking/:id_group')
  buscarPorId(
    @Param('id_booking', ParseIntPipe) id_booking: number,
    @Param('id_group', ParseIntPipe) id_group: number,
  ) {
    return this.service.buscarPorId(id_booking, id_group);
  }

  @Post()
  salvar(@Body() dto: CreateEventBookingGroupDto) {
    return this.service.salvar(dto);
  }

  @Patch(':id_booking/:id_group')
  atualizar(
    @Param('id_booking', ParseIntPipe) id_booking: number,
    @Param('id_group', ParseIntPipe) id_group: number,
    @Body() dto: UpdateEventBookingGroupDto,
  ) {
    return this.service.atualizar(id_booking, id_group, dto);
  }

  @Delete(':id_booking/:id_group')
  remover(
    @Param('id_booking', ParseIntPipe) id_booking: number,
    @Param('id_group', ParseIntPipe) id_group: number,
  ) {
    return this.service.remover(id_booking, id_group);
  }
}
