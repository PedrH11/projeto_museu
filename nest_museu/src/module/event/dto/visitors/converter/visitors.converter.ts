import { Visitor } from '../../../entities/visitors.entity';
import { VisitorResponse } from '../response/visitors.response';

export class VisitorsConverter {
  public static toResponse(entity: Visitor): VisitorResponse {
    const response = new VisitorResponse();
    response.idVisitor = entity.idVisitor;
    response.firstName = entity.firstName;
    response.lastName = entity.lastName;
    response.email = entity.email;
    response.cpf = entity.cpf;
    response.phone = entity.phone;
    response.createdAt = entity.createdAt;
    return response;
  }

  public static toResponseList(entities: Visitor[]): VisitorResponse[] {
    return entities.map((entity) => this.toResponse(entity));
  }
}
