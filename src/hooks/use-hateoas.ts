// hooks/useHateoas.ts
import { useCallback } from 'react';
import { ApiResponse, Link } from '../type/api';

export function useHateoas() {
  /**
   * Verifica se uma ação existe nos links da resposta da API
   * @param response O objeto ApiResponse retornado pelo servidor
   * @param action A chave da ação (ex: 'create', 'update', 'delete', 'self')
   */
  const getAction = useCallback(<T>(response: ApiResponse<T> | null | undefined, action: string): Link | null => {
    if (!response || !response._links) return null;

    const link = response._links[action];

    if (link && link.href) {
      return link;
    }

    return null;
  }, []);

  /**
   * Atalho para pegar apenas a URL (href)
   */
  const getUrl = useCallback(
    <T>(response: ApiResponse<T> | null | undefined, action: string): string | null => {
      return getAction(response, action)?.href || null;
    },
    [getAction],
  );

  /**
   * Verifica se a ação é permitida (true/false)
   */
  const can = useCallback(
    <T>(response: ApiResponse<T> | null | undefined, action: string): boolean => {
      return !!getAction(response, action);
    },
    [getAction],
  );

  return { getAction, getUrl, can };
}
