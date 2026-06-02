import { RegisterResponse } from '../../schemas/register-schemas';
import { ConnectionService } from './ConnectionService';

export class RegisterService extends ConnectionService<RegisterResponse> {
  constructor(ENTITY: string) {
    super(ENTITY);
  }
}
