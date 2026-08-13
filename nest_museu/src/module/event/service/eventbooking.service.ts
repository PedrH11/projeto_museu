import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericConverter } from '../../../commons/converter/converter.commons';
import { EntityNotFoundException } from '../../../commons/exceptions/error/entity-not-found.exception';
import { EVENT_BOOKING } from '../constants/eventbooking.constants';
import { EventBookingRequest } from '../dto/eventbooking/request/eventbooking.request';
import { EventBookingResponse } from '../dto/eventbooking/response/eventbooking.response';
import { EventBooking } from '../entities/eventbooking.entity';

@Injectable()
export class EventBookingService {
  constructor(
    @InjectRepository(EventBooking)
    private eventBookingRepository: Repository<EventBooking>,
  ) {}

  async listar(id_event?: number): Promise<EventBookingResponse[]> {
    try {
      const query = this.eventBookingRepository.createQueryBuilder(
        EVENT_BOOKING.ENTITY,
      );

      if (id_event) {
        query.andWhere(
          `${EVENT_BOOKING.ENTITY}.${EVENT_BOOKING.TABLE_FIELDS.ID_EVENT} = :id_event`,
          { id_event },
        );
      }

      const bookings = await query.getMany();
      return GenericConverter.toListResponse(EventBookingResponse, bookings);
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async buscarPorId(id: number): Promise<EventBooking> {
    try {
      const booking = await this.eventBookingRepository
        .createQueryBuilder(EVENT_BOOKING.ENTITY)
        .where(`${EVENT_BOOKING.SEARCH.POR_ID} = :id`, { id })
        .getOne();

      if (!booking) {
        throw new EntityNotFoundException(
          EVENT_BOOKING.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }
      return booking;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async porId(id: number): Promise<EventBookingResponse | null> {
    const booking = await this.buscarPorId(id);
    return GenericConverter.toResponse(EventBookingResponse, booking);
  }

  async salvar(request: EventBookingRequest): Promise<EventBookingResponse> {
    try {
      const novaReserva = GenericConverter.toEntity(EventBooking, request);
      const reservaSalva = await this.eventBookingRepository.save(novaReserva);
      return GenericConverter.toResponse(EventBookingResponse, reservaSalva);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao criar reserva: ${error.message}`,
      );
    }
  }

  async atualizar(
    id: number,
    request: Partial<EventBookingRequest>,
  ): Promise<EventBookingResponse | null> {
    const reservaCadastrada = await this.buscarPorId(id);

    if (!reservaCadastrada) {
      throw new EntityNotFoundException(
        EVENT_BOOKING.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
      );
    }

    try {
      Object.assign(reservaCadastrada, request);
      const reservaAtualizada =
        await this.eventBookingRepository.save(reservaCadastrada);
      return GenericConverter.toResponse(
        EventBookingResponse,
        reservaAtualizada,
      );
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao processar: ${error.message}`,
      );
    }
  }
}
