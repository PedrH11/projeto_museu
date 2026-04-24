import { UsuarioResponse } from '../../schemas/usuario-schemas';
import { ApiResponse, PageResponse } from '../../type/api';
import ListarUsuarioForm from '../forms/usuario/ListarUsuarioForm';

export default async function ListarUsuarios({ result }: { result: ApiResponse<PageResponse<UsuarioResponse>> }) {
  return <ListarUsuarioForm result={result} />;
}
