import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PAGINATION } from './pagination.enum';

export class PaginationDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página',
    default: PAGINATION.PAGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = PAGINATION.PAGE;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade por página',
    default: PAGINATION.PAGESIZE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number = PAGINATION.PAGESIZE;

  @ApiPropertyOptional({
    example: 'atributo da classe ',
    description: 'Campo para ordenação',
  })
  @IsOptional()
  @IsString()
  field?: string;

  @ApiPropertyOptional({
    example: 'ASC',
    description: 'Ordem (ASC ou DESC)',
    default: PAGINATION.ASC,
  })
  @IsOptional()
  @IsString()
  order?: string = PAGINATION.ASC;

  @ApiPropertyOptional({ example: 'museu', description: 'Filtro de busca' })
  @IsOptional()
  @IsString()
  search?: string;
}
