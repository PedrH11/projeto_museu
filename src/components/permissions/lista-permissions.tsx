import { PermissionsResponse } from '../../schemas/permissions-schemas';
import { ApiResponse, PageResponse } from '../../type/api';
import ListarPermissionsForm from '../forms/permissions/ListarPermissionsForm';

export default async function ListarPermissions({
  result,
}: {
  result: ApiResponse<PageResponse<PermissionsResponse>>;
}) {
  return <ListarPermissionsForm result={result} />;
}
