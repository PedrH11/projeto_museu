import { ResourcesResponse } from '../../schemas/resources-schemas';
import { ApiResponse, PageResponse } from '../../type/api';
import ListarResourcesForm from '../forms/resources/ListarResourcesForm';


export default async function ListarResources({
  result,
}: {
  result: ApiResponse<PageResponse<ResourcesResponse>>;
}) {
  return <ListarResourcesForm result={result} />;
}
