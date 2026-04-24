import { ClassConstructor, plainToInstance } from 'class-transformer';

export class GenericConverter {
  /**
   * Converte um objeto (geralmente Request/DTO) para a Entidade de domínio.
   */
  static toEntity<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToInstance(cls, plain);
  }

  /**
   * Converte uma Entidade para um DTO de Resposta (usando @Expose).
   */
  static toResponse<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToInstance(cls, plain, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Converte uma lista de objetos para uma lista de DTOs de Resposta.
   */
  static toListResponse<T, V>(cls: ClassConstructor<T>, plain: V[]): T[] {
    return plainToInstance(cls, plain, {
      excludeExtraneousValues: true,
    });
  }
}
