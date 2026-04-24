import {
  UsuarioCreate,
  UsuarioResponse,
  UsuarioUpdate,
} from '../../schemas/usuario-schemas';
import { ConnectionService } from './ConnectionService';

export class UsuarioService extends ConnectionService<
  UsuarioResponse,
  UsuarioCreate,
  UsuarioUpdate
> {
  constructor(ENTITY: string) {
    super(ENTITY);
  }
}
