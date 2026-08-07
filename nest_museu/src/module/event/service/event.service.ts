import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericConverter } from '../../../commons/converter/converter.commons';
import { EntityNotFoundException } from '../../../commons/exceptions/error/entity-not-found.exception';
import { EVENT } from '../constants/event.constants';
import { AssignSponsorToEventRequest } from '../dto/request/assign-sponsor-to-event.request';
import { EventRequest } from '../dto/request/event.request';
import { RemoveSponsorToEventRequest } from '../dto/request/remove-sponsor-from-event.request';
import { EventResponse } from '../dto/response/event.response';
import { Event } from '../entities/event.entity';
import { EventSponsor } from '../entities/eventsponsor.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private eventSponsorRepository: Repository<EventSponsor>,
  ) {}

  async listar(
    search?: string,
    startDate?: string,
    endDate?: string,
  ): Promise<EventResponse[]> {
    try {
      const query = this.eventRepository.createQueryBuilder(EVENT.ENTITY);

      if (search) {
        query.andWhere(
          `${EVENT.ENTITY}.${EVENT.TABLE_FIELDS.TITLE} ILIKE :search`,
          {
            search: `%${search}%`,
          },
        );
      }

      if (startDate && endDate) {
        query.andWhere(
          `${EVENT.ENTITY}.${EVENT.TABLE_FIELDS.START_DATE} BETWEEN :start AND :end`,
          {
            start: startDate,
            end: endDate,
          },
        );
      } else if (startDate) {
        query.andWhere(
          `${EVENT.ENTITY}.${EVENT.TABLE_FIELDS.START_DATE} >= :start`,
          {
            start: startDate,
          },
        );
      }

      const events = await query.getMany();

      const listaEvents = GenericConverter.toListResponse(
        EventResponse,
        events,
      );

      return listaEvents;
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async porId(id: number): Promise<EventResponse | null> {
    const event = await this.buscarPorId(id);

    if (!event) {
      throw new EntityNotFoundException(EVENT.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
    }

    return GenericConverter.toResponse(EventResponse, event);
  }

  async salvar(eventRequest: EventRequest): Promise<EventResponse> {
    try {
      const novoEvent = GenericConverter.toEntity(Event, eventRequest);

      const eventSalvo = await this.eventRepository.save(novoEvent);

      return GenericConverter.toResponse(EventResponse, eventSalvo);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao criar usuário: ${error.message}`,
      );
    }
  }

  async atualizar(
    id: number,
    eventRequest: EventRequest,
  ): Promise<EventResponse | null> {
    const eventCadastrado = await this.buscarPorId(id);

    if (!eventCadastrado) {
      throw new EntityNotFoundException(EVENT.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
    }

    try {
      const dadosNovos = GenericConverter.toEntity(Event, eventRequest);
      const eventParaSalvar = Object.assign(eventCadastrado, dadosNovos);
      const eventExistente = await this.eventRepository.save(eventParaSalvar);

      return GenericConverter.toResponse(EventResponse, eventExistente);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao processar: ${error.message}`,
      );
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      const event = await this.buscarPorId(id);

      if (!event) {
        throw new EntityNotFoundException(
          EVENT.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }

      await this.eventRepository.remove(event);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async buscarPorId(id: number): Promise<Event> {
    try {
      const event = await this.eventRepository
        .createQueryBuilder(EVENT.ENTITY)
        .where(`${EVENT.SEARCH.POR_ID} = :id`, { id })
        .getOne();

      if (!event) {
        throw new EntityNotFoundException(
          EVENT.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }
      return event;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async atribuirPatrocinadorAoEvento(
    request: AssignSponsorToEventRequest,
  ): Promise<void> {
    try {
      const newEventSponsorAssing = GenericConverter.toEntity(
        EventSponsor,
        request,
      );

      await this.eventSponsorRepository.save(newEventSponsorAssing);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao atribuir um patrocinador ao evento: ${error.message}`,
      );
    }
  }

  async removerPatrocinadorDoEvento(
    request: RemoveSponsorToEventRequest,
  ): Promise<void> {
    try {
      const eventSponsor = await this.eventSponsorRepository.findOneBy({
        idEvent: request.idEvent,
        idSponsor: request.idSponsor,
      });

      if (!eventSponsor) {
        throw new EntityNotFoundException(
          EVENT.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }

      await this.eventSponsorRepository.remove(eventSponsor);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao remover um patrocinador do evento: ${error.message}`,
      );
    }
  }
}
