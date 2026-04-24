import { ResourcesResponse } from '../../schemas/resources-schemas';
import { ConnectionService } from './ConnectionService';

export class RecursosService extends ConnectionService<
  ResourcesResponse
> {
  constructor(ENTITY: string) {
    super(ENTITY);
  }
}
