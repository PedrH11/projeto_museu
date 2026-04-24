// hooks/use-connection.ts
import { useMemo } from 'react';
import { useResources } from '../service/providers/resource-providers';
import { ConnectionService } from '../service/connection/ConnectionService';

export function useConnection<T, TCreate = T, TUpdate = T>(entityName: string) {
  const { getEndpoint, loading } = useResources();
  const service = useMemo(() => {
    const url = getEndpoint(entityName);

    if (!url || loading) return null;

    return new ConnectionService<T, TCreate, TUpdate>(url);
  }, [entityName, getEndpoint, loading]);

  return { service, loading };
}
