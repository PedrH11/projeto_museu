import { ContactResponse } from '../../schemas/contact-schema';
import { ApiResponse, PageResponse } from '../../type/api';
import ListarContactForm from '../forms/contact/ListarContactForm';

export default async function ListarContact({ result }: { result: ApiResponse<PageResponse<ContactResponse>> }) {
  return <ListarContactForm result={result} />;
}
