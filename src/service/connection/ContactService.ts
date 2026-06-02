import {
  ContactCreate,
  ContactResponse,
  ContactUpdate,
} from '../../schemas/contact-schema';
import { ConnectionService } from './ConnectionService';

export class ContactService extends ConnectionService<
  ContactResponse,
  ContactCreate,
  ContactUpdate
> {
  constructor(ENTITY: string) {
    super(ENTITY);
  }
}
