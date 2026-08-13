import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateColaboratorDto {
  @IsString({ message: 'O nome deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name!: string;

  @IsUrl({}, { message: 'A logo_url deve ser uma URL válida.' })
  @IsOptional()
  logo_url?: string;
}

export class UpdateColaboratorDto {
  @IsString({ message: 'O nome deve ser uma string válida.' })
  @IsOptional()
  name?: string;

  @IsUrl({}, { message: 'A logo_url deve ser uma URL válida.' })
  @IsOptional()
  logo_url?: string;
}
