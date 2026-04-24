import { plainToInstance } from 'class-transformer';
import { Contact } from '../../entities/contact.entity';
import { ContactRequest } from '../request/contact.request';
import { ContactResponse } from '../response/contact.response';

export class ContactConverter {
  static toContact(contactRequest: ContactRequest): Contact {
    return plainToInstance(Contact, contactRequest);
  }

  static toContactResponse(contact: Contact): ContactResponse {
    return plainToInstance(ContactResponse, contact, {
      excludeExtraneousValues: true, // tem a função de ignorar as propriedades não marcadas com @Expose()
    });
  }

  static toListContactResponse(listaContact: Contact[]): ContactResponse[] {
    return plainToInstance(ContactResponse, listaContact, {
      excludeExtraneousValues: true,
    });
  }
}
