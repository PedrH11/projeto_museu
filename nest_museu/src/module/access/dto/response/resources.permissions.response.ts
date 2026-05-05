import { Expose } from 'class-transformer';

export class ResourcePermissionsResponse {
  @Expose() idResources!: number;
  @Expose() nomeResources!: string;
  @Expose() roleId!: number;
  @Expose() nomeRole!: string;
  @Expose() acoesAtivas!: string[]; // ['read', 'update']
}
