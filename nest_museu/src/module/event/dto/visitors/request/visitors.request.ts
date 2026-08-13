import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateVisitorRequest {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{11}$)/, {
    message: 'CPF em formato inválido',
  })
  cpf!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;
}

export class UpdateVisitorRequest extends PartialType(CreateVisitorRequest) {}
