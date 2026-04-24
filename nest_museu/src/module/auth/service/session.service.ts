import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { GenericConverter } from '../../../commons/converter/converter.commons';
import { EntityNotFoundException } from '../../../commons/excpetions/error/entityNotFound.exceptions';
import { Pageable } from '../../../commons/pagination/page.response';
import { Page } from '../../../commons/pagination/paginacao.sistema';
import { fieldsSession, SESSION } from '../constants/session.constants';
import { SessionRequest } from '../dto/request/session.request';
import { SessionResponse } from '../dto/response/session.response';
import { Session } from '../entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async listar(
    page: number,
    pageSize: number,
    field: string,
    order: string,
    search?: string,
  ): Promise<Page<SessionResponse>> {
    const pageable = new Pageable(page, pageSize, field, order, fieldsSession);
    try {
      const query = this.sessionRepository
        .createQueryBuilder(SESSION.ENTITY)
        .orderBy(`${SESSION.ENTITY}.${pageable.field}`, pageable.order)
        .skip(pageable.offset)
        .take(pageable.limit);

      if (search) {
        query.where(`${SESSION.ENTITY}.${field} LIKE :search`, {
          search: `%${search}%`,
        });
      }

      const [sessions, totalElements] = await query.getManyAndCount();

      const listaSessions = GenericConverter.toListResponse(
        SessionResponse,
        sessions,
      );

      return Page.of(listaSessions, totalElements, pageable);
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async porId(id: number): Promise<SessionResponse | null> {
    const session = await this.buscarPorId(id);

    if (!session) {
      throw new EntityNotFoundException(
        SESSION.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
      );
    }

    return GenericConverter.toResponse(SessionResponse, session);
  }

  async salvar(session: DeepPartial<Session>): Promise<void> {
    if (!session) {
      throw new InternalServerErrorException('Dados da sessão não informados.');
    }
    try {
      const newSession = this.sessionRepository.create(session);
      await this.sessionRepository.save(newSession);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao criar sessão: ${error.message}`,
      );
    }
  }

  async atualizar(
    id: number,
    sessionRequest: SessionRequest,
  ): Promise<SessionResponse | null> {
    const sessionCadastrado = await this.buscarPorId(id);

    if (!sessionCadastrado) {
      throw new EntityNotFoundException(
        SESSION.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
      );
    }

    try {
      const dadosNovos = GenericConverter.toEntity(Session, sessionRequest);

      const sessionParaSalvar = Object.assign(sessionCadastrado, dadosNovos);
      const sessionExistente =
        await this.sessionRepository.save(sessionParaSalvar);

      return GenericConverter.toResponse(SessionResponse, sessionExistente);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Erro ao processar: ${error.message}`,
      );
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      const session = await this.buscarPorId(id);

      if (!session) {
        throw new EntityNotFoundException(
          SESSION.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }

      await this.sessionRepository.remove(session);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async buscarPorId(id: number): Promise<Session> {
    try {
      const session = await this.sessionRepository
        .createQueryBuilder(SESSION.ENTITY)
        .where(`${SESSION.SEARCH.POR_ID} = :id`, { id })
        .getOne();

      if (!session) {
        throw new EntityNotFoundException(
          SESSION.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }
      return session;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
