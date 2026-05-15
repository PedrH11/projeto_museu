import { IsNotEmpty, IsString } from 'class-validator';

export class TwoFactorAuthenticationCodeResponse {
  @IsString()
  @IsNotEmpty()
  twoFactorAuthenticationCode!: string;
}
