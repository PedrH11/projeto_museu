import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailResponse {
  @IsString()
  @IsNotEmpty()
  token!: string;
}
