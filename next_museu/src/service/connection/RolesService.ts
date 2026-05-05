import {
  RolesCreate,
  RolesResponse,
  RolesUpdate,
} from '../../schemas/roles-schemas';
import { ConnectionService } from './ConnectionService';

export class RolesService extends ConnectionService<
  RolesResponse,
  RolesCreate,
  RolesUpdate
> {
  constructor(ENTITY: string) {
    super(ENTITY);
  }
}
