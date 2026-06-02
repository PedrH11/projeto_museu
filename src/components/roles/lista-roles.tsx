import { RolesResponse } from '../../schemas/roles-schemas';
import { ApiResponse, PageResponse } from '../../type/api';
import ListarRolesForm from '../forms/roles/ListarRolesForm';

export default async function ListarRoles({
  result,
}: {
  result: ApiResponse<PageResponse<RolesResponse>>;
}) {
  return <ListarRolesForm result={result} />;
}
