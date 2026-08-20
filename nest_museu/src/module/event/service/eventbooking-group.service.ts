import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventBookingGroup } from '../entities/eventbooking-group.entity';
import { CreateEventBookingGroupDto } from '../dto/eventbooking-group/request/create-eventbooking-group.dto';
import { UpdateEventBookingGroupDto } from '../dto/eventbooking-group/request/update-eventbooking-group.dto';
import { EventBookingGroupConverter } from '../dto/eventbooking-group/converter/eventbooking-group.converter';
import { EventBookingGroupResponse } from '../dto/eventbooking-group/response/eventbooking-group.response';

@Injectable()
export class EventBookingGroupService {
  constructor(
    @InjectRepository(EventBookingGroup)
    private readonly repository: Repository<EventBookingGroup>,
  ) {}

  async listar(): Promise<EventBookingGroupResponse[]> {
    const registros = await this.repository.find();

    return EventBookingGroupConverter.toListResponse(registros);
  }

  async buscarPorId(
    id_booking: number,
    id_group: number,
  ): Promise<EventBookingGroupResponse> {
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

    return EventBookingGroupConverter.toResponse(registro);
  }

  async salvar(
    dto: CreateEventBookingGroupDto,
  ): Promise<EventBookingGroupResponse> {
    const registroExistente = await this.repository.findOne({
      where: {
        id_booking: dto.id_booking,
        id_group: dto.id_group,
      },
    });

    if (registroExistente) {
      throw new ConflictException(
        'Essa reserva já está associada a esse grupo',
      );
    }

    const novoRegistro = EventBookingGroupConverter.toEntity(dto);
    const registroSalvo = await this.repository.save(novoRegistro);

    return EventBookingGroupConverter.toResponse(registroSalvo);
  }

  async atualizar(
    id_booking: number,
    id_group: number,
    dto: UpdateEventBookingGroupDto,
  ): Promise<EventBookingGroupResponse> {
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

    Object.assign(registro, dto);

    const registroAtualizado = await this.repository.save(registro);

    return EventBookingGroupConverter.toResponse(registroAtualizado);
  }

  async remover(id_booking: number, id_group: number): Promise<void> {
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

    await this.repository.remove(registro);
  }
}
