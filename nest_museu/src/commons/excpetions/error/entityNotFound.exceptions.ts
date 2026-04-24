import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exceptions';

export class EntityNotFoundException extends NegocioException {
  constructor(message: string, error?: string | null) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error: error ?? 'Entidade não existe!',
    });
  }
}
