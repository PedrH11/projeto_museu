import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPaginationQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      example: 1,
      description: 'Número da página',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      example: 10,
      description: 'Quantidade de itens por página',
    }),
    ApiQuery({
      name: 'sort',
      required: false,
      type: String,
      example: 'createdAt:desc',
      description: 'Campo para ordenação',
    }),
  );
}
