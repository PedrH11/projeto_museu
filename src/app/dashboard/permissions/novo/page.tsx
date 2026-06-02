import { SalvarPermissions } from '../../../../components/permissions/salvar-permissions';
import { listarRecursos } from '../../resources/page';
import { listarRoles } from '../../roles/page';

export default async function PermissionsSalvar({
  searchParams,
}: {
  searchParams: {
    page?: string;
    pageSize?: string;
    field?: string;
    order?: string;
    search?: string;
  };
}) {
  const params = await searchParams;
  const roles = await listarRoles(
    params.page,
    params.pageSize,
    params.field,
    params.order,
    params.search,
  );

  const resources = await listarRecursos(
    params.page,
    params.pageSize,
    params.field,
    params.order,
    params.search,
  );
  return <SalvarPermissions roles={roles} resources={resources} />;
}
