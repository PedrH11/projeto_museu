import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNotFoundException } from '../../../commons/exceptions/error/entity-not-found.exception';
import { EVENT_SPOTLIGHT } from '../constants/event_spotlight.constants';
import { EventSpotlightConverter } from '../dto/event_spotlight/converter/event_spotlight.converter';
import { EventSpotlightRequest } from '../dto/event_spotlight/request/event_spotlight.request';
import { EventSpotlightResponse } from '../dto/event_spotlight/response/event_spotlight.response';
import { EventSpotlight } from '../entities/event_spotlight.entity';

@Injectable()
export class EventSpotlightService {
  constructor(
    @InjectRepository(EventSpotlight)
    private eventSpotlightRepository: Repository<EventSpotlight>,
  ) {}

  async listar(): Promise<EventSpotlightResponse[]> {
    try {
      const hoje = new Date();

      const eventSpotlights = await this.eventSpotlightRepository
        .createQueryBuilder(EVENT_SPOTLIGHT.ENTITY)
        .leftJoinAndSelect(`${EVENT_SPOTLIGHT.ENTITY}.event`, 'event')
        .where(
          `${EVENT_SPOTLIGHT.ENTITY}.${EVENT_SPOTLIGHT.TABLE_FIELDS.START_DATE} <= :hoje`,
          { hoje },
        )
        .andWhere(
          `${EVENT_SPOTLIGHT.ENTITY}.${EVENT_SPOTLIGHT.TABLE_FIELDS.END_DATE} >= :hoje`,
          { hoje },
        )
        .getMany();

      return EventSpotlightConverter.toListEventSpotlightResponse(
        eventSpotlights,
      );
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async salvar(
    eventSpotlightRequest: EventSpotlightRequest,
  ): Promise<EventSpotlightResponse> {
    try {
      const novoEventSpotlight = EventSpotlightConverter.toEventSpotlight(
        eventSpotlightRequest,
      );

      const eventSpotlightSalvo =
        await this.eventSpotlightRepository.save(novoEventSpotlight);

      return EventSpotlightConverter.toEventSpotlightResponse(
        eventSpotlightSalvo,
      );
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao criar destaque: ${error.message}`,
      );
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      const eventSpotlight = await this.buscarPorId(id);

      if (!eventSpotlight) {
        throw new EntityNotFoundException(
          EVENT_SPOTLIGHT.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }

      await this.eventSpotlightRepository.remove(eventSpotlight);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async buscarPorId(id: number): Promise<EventSpotlight> {
    try {
      const eventSpotlight = await this.eventSpotlightRepository
        .createQueryBuilder(EVENT_SPOTLIGHT.ENTITY)
        .leftJoinAndSelect(`${EVENT_SPOTLIGHT.ENTITY}.event`, 'event')
        .where(`${EVENT_SPOTLIGHT.SEARCH.POR_ID} = :id`, { id })
        .getOne();

      if (!eventSpotlight) {
        throw new EntityNotFoundException(
          EVENT_SPOTLIGHT.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }

      return eventSpotlight;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
