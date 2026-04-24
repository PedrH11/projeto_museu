import React from 'react';
import { VERBO_HTTP } from '../../type/type';
import { getResource } from '../connection/ResourceService';

export interface Resource {
  name: string;
  endpoint: string;
  method: VERBO_HTTP[];
}

interface ResourceContextType {
  resources: Resource[];
  getEndpoint: (name: string, id?: string | number) => string | undefined;
  loading: boolean;
}

const ResourceContext = React.createContext<ResourceContextType | undefined>(
  undefined,
);

export function ResourceProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function initResources(): Promise<void> {
      try {
        if (typeof window !== 'undefined') {
          const cached = sessionStorage.getItem('museu_resources');
          if (cached) {
            setResources(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }
        const data = await getResource();
        if (data) {
          setResources(data);
          sessionStorage.setItem('museu_resources', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Falha ao carregar rotas do Museu:', error);
      } finally {
        setLoading(false);
      }
    }
    initResources().catch((err) => {
      console.error('Erro fatal na inicialização de recursos:', err);
    });
  }, []);

  const getEndpoint = React.useCallback(
    (name: string, id?: string | number) => {
      const resource = resources.find((r) => {
        const hasIdPlaceholder = r.endpoint.includes(':id');
        return r.name === name && (id ? hasIdPlaceholder : !hasIdPlaceholder);
      });

      if (resource) {
        return id ? resource.endpoint.replace('/:id', '') : resource.endpoint;
      }

      return undefined;
    },
    [resources],
  );

  const value = React.useMemo(
    () => ({
      resources,
      getEndpoint,
      loading,
    }),
    [resources, loading, getEndpoint],
  );

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}

export const useResources = () => {
  const context = React.useContext(ResourceContext);
  if (context === undefined) {
    throw new Error(
      'useResources deve ser usado dentro de um ResourceProvider',
    );
  }
  return context;
};
