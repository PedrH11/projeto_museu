import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventBookingGroup } from '../entities/eventbooking-group.entity';
import { CreateEventBookingGroupDto } from '../dto/eventbooking-group/request/create-eventbooking-group.dto';
import { UpdateEventBookingGroupDto } from '../dto/eventbooking-group/request/update-eventbooking-group.dto';

@Injectable()
export class EventBookingGroupService {
  constructor(
    @InjectRepository(EventBookingGroup)
    private readonly repository: Repository<EventBookingGroup>,
  ) {}

  async listar(): Promise<EventBookingGroup[]> {
    return this.repository.find();
  }

  async buscarPorId(
    id_booking: number,
    id_group: number,
  ): Promise<EventBookingGroup> {
    const registro = await this.repository.findOne({
      where: {
        id_booking,
        id_group,
      },
    });

    if (!registro) {
      throw new NotFoundException(
        'Relação entre reserva e grupo não encontrada',
      );
    }

    return registro;
  }

  async salvar(dto: CreateEventBookingGroupDto): Promise<EventBookingGroup> {
    const registroExistente = await this.repository.findOne({
      where: {
        id_booking: dto.id_booking,
        id_group: dto.id_group,
      },
    });

    if (registroExistente) {
      throw new Error('Essa reserva já está associada a esse grupo');
    }

    const novoRegistro = this.repository.create(dto);

    return this.repository.save(novoRegistro);
  }

  async atualizar(
    id_booking: number,
    id_group: number,
    dto: UpdateEventBookingGroupDto,
  ): Promise<EventBookingGroup> {
    const registro = await this.buscarPorId(id_booking, id_group);

    Object.assign(registro, dto);

    return this.repository.save(registro);
  }

  async remover(id_booking: number, id_group: number): Promise<void> {
    const registro = await this.buscarPorId(id_booking, id_group);

    await this.repository.remove(registro);
  }
}
