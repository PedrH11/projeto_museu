import { Colaborator } from '../../../entities/colaborators.entity';
import { CreateColaboratorDto } from '../request/colaborators.request';
import { ColaboratorResponse } from '../response/colaborators.response';

export class ColaboratorsConverter {
  public static toEntity(dto: CreateColaboratorDto): Colaborator {
    const entity = new Colaborator();
    entity.name = dto.name;
    entity.logoUrl = dto.logo_url;
    return entity;
  }

  public static toResponse(entity: Colaborator): ColaboratorResponse {
    const response = new ColaboratorResponse();
    response.id_colaborator = entity.idColaborator;
    response.name = entity.name;
    response.logo_url = entity.logoUrl;
    return response;
  }
}
