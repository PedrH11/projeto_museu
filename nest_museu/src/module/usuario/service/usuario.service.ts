import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { GenericConverter } from '../../../commons/converter/converter.commons';
import PostgresErrorCode from '../../../commons/enum/postgre.code.enun';
import { EmailException } from '../../../commons/excpetions/error/email.exceptions';
import { EntityNotFoundException } from '../../../commons/excpetions/error/entityNotFound.exceptions';
import { ServerErrorExceptions } from '../../../commons/excpetions/error/server.error.exceptions';
import { Pageable } from '../../../commons/pagination/page.response';
import { Page } from '../../../commons/pagination/paginacao.sistema';
import { RegisterUsuarioRequest } from '../../auth/dto/request/register.usuario.request';
import { Credentials } from '../../auth/entities/credentials.entity';
import { EmailConfirmationService } from '../../email/service/emailConfirmation.service';
import { fieldsUsuario, USUARIO } from '../constants/usuario.constantes';
import { UsuarioConverter } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private readonly dataSource: DataSource,
    private readonly emailConfirmationService: EmailConfirmationService,
    //private readonly jwtService: JwtService,
    //private readonly configService: ConfigService,
  ) {}

  async listar(
    page: number,
    pageSize: number,
    field: string,
    order: string,
    search?: string,
  ): Promise<Page<UsuarioResponse>> {
    const pageable = new Pageable(page, pageSize, field, order, fieldsUsuario);
    try {
      const query = this.usuarioRepository
        .createQueryBuilder(USUARIO.ENTITY)
        .innerJoin('usuario.credentials', 'cred')
        .select('usuario.id_usuario', 'idUsuario')
        .addSelect('cred.email', 'email')
        .where('usuario.deleted_at IS NULL')
        .andWhere('cred.deleted_at IS NULL');

      if (search) {
        query.where(`${USUARIO.ENTITY}.${field} LIKE :search`, {
          search: `%${search}%`,
        });
      }

      const usuarios = await query
        .orderBy(`${USUARIO.ENTITY}.${pageable.field}`, pageable.order)
        .skip(pageable.offset)
        .take(pageable.limit)
        .getRawMany();

      const totalElements = await query.getCount();

      const listaUsuarios = GenericConverter.toListResponse(
        UsuarioResponse,
        usuarios,
      );

      return Page.of(listaUsuarios, totalElements, pageable);
    } catch (error: any) {
      throw new ServerErrorExceptions(
        USUARIO.MENSAGEM.SERVER_ERROR,
        error.message,
      );
    }
  }

  async porId(id: number): Promise<UsuarioResponse | null> {
    const usuario = await this.buscarPorId(id);

    if (!usuario) {
      throw new EntityNotFoundException(
        USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
      );
    }

    return GenericConverter.toResponse(UsuarioResponse, usuario);
  }

  async salvar(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const novoUsuario = GenericConverter.toEntity(Usuario, usuarioRequest);

        const usuarioSalvo = await manager.save(Usuario, novoUsuario);

        const passwordHash = await bcrypt.hash(usuarioRequest.password, 10);

        const credentials = manager.create(Credentials, {
          email: usuarioRequest.email,
          passwordHash,
          usuarioId: usuarioSalvo.idUsuario,
        });

        await manager.save(Credentials, credentials);

        return GenericConverter.toResponse(UsuarioResponse, usuarioSalvo);
      });
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new EmailException(USUARIO.MENSAGEM.EMAIL_CADASTRADO);
      }

      throw new ServerErrorExceptions(
        USUARIO.MENSAGEM.SERVER_ERROR,
        error.message,
      );
    }
  }

  async atualizar(
    id: number,
    usuarioRequest: UsuarioRequest,
  ): Promise<UsuarioResponse | null> {
    const usuarioCadastrado = await this.buscarPorId(id);

    if (!usuarioCadastrado) {
      throw new EntityNotFoundException(
        USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
      );
    }

    try {
      const dadosNovos = UsuarioConverter.toUsuario(usuarioRequest);
      const usuarioParaSalvar = Object.assign(usuarioCadastrado, dadosNovos);
      const usuarioExistente =
        await this.usuarioRepository.save(usuarioParaSalvar);

      return GenericConverter.toResponse(UsuarioResponse, usuarioExistente);
    } catch (error: any) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new EmailException(USUARIO.MENSAGEM.EMAIL_CADASTRADO);
      }

      throw new ServerErrorExceptions(
        USUARIO.MENSAGEM.SERVER_ERROR,
        error.message,
      );
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      const usuario = await this.buscarPorId(id);

      if (!usuario) {
        throw new EntityNotFoundException(
          USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }

      await this.usuarioRepository.remove(usuario);
    } catch (error: any) {
      throw new ServerErrorExceptions(
        USUARIO.MENSAGEM.SERVER_ERROR,
        error.message,
      );
    }
  }

  async buscarPorId(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository
        .createQueryBuilder(USUARIO.ENTITY)
        .where(`${USUARIO.SEARCH.POR_ID} = :id`, { id })
        .getOne();

      if (!usuario) {
        throw new EntityNotFoundException(
          USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA,
        );
      }
      return usuario;
    } catch (error: any) {
      throw new ServerErrorExceptions(
        USUARIO.MENSAGEM.SERVER_ERROR,
        error.message,
      );
    }
  }

  async markEmailAsConfirmed(email: string) {
    return this.usuarioRepository.update(
      { email },
      {
        emailVerified: true,
      },
    );
  }

  async setTwoFactorAuthenticationSecret(
    code: string,
    expiresAt: Date,
    userId: number,
  ) {
    return this.usuarioRepository.update(userId, {
      mfaCode: code,
      mfaExpiresAt: expiresAt,
    });
  }

  async removeRefreshToken(userId: number) {
    return await this.usuarioRepository.update(userId, {
      currentHashedRefreshToken: '',
    });
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.usuarioRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: true,
    });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usuarioRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: userId },
    });
    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    const isMatching = await bcrypt.compare(
      refreshToken,
      usuario.currentHashedRefreshToken ?? '',
    );
    if (isMatching) return usuario;
    throw new UnauthorizedException('Refresh token inválido.');
  }

  async hashedRefreshToken(userId: number) {
    try {
      await this.usuarioRepository.update(userId, {
        currentHashedRefreshToken: '',
      });

      return { message: 'Senha redefinida com sucesso!' };
    } catch (error: any) {
      throw new BadRequestException(
        'Token de recuperação inválido ou expirado.',
        error.message,
      );
    }
  }

  //####################### Rotina para criar o registro do usuário  ###################

  async registrarUsuario(registerUsuarioRequest: RegisterUsuarioRequest) {
    let usuarioSalvoResponse: UsuarioResponse;
    try {
      usuarioSalvoResponse = await this.dataSource.transaction(
        async (manager) => {
          const novoUsuario = GenericConverter.toEntity(
            Usuario,
            registerUsuarioRequest,
          );

          const usuarioSalvo = await manager.save(Usuario, novoUsuario);

          const passwordHash = await bcrypt.hash(
            registerUsuarioRequest.password,
            10,
          );

          const credentials = manager.create(Credentials, {
            email: registerUsuarioRequest.email,
            passwordHash,
            usuarioId: usuarioSalvo.idUsuario,
          });

          await manager.save(Credentials, credentials);

          return GenericConverter.toResponse(UsuarioResponse, usuarioSalvo);
        },
      );
      await this.emailConfirmationService.sendVerificationLink(
        registerUsuarioRequest.email,
      );

      return usuarioSalvoResponse;
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new EmailException(USUARIO.MENSAGEM.EMAIL_CADASTRADO);
      }

      throw new ServerErrorExceptions(
        USUARIO.MENSAGEM.SERVER_ERROR,
        error.message,
      );
    }
  }
}
