import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates page numbers for pagination with ellipsis
 * @param currentPage - Current page number (1-based)
 * @param totalPages - Total number of pages
 * @returns Array of page numbers and ellipsis strings
 *
 */
export function getPageNumbers(currentPage: number, totalPages: number): number[] {
  const windowSize = 10; // Tamanho do bloco de páginas que você quer mostrar
  let start: number;
  let end: number;

  if (totalPages <= windowSize) {
    // Se o total de páginas for menor que o bloco, mostra todas
    start = 1;
    end = totalPages;
  } else {
    // Lógica para centralizar a página atual no bloco
    // Subtraímos 4 para que a página atual fique mais ou menos no meio (ex: 5ª posição)
    start = Math.max(1, currentPage - 4);
    end = start + windowSize - 1;

    // Ajuste caso o fim ultrapasse o total de páginas
    if (end > totalPages) {
      end = totalPages;
      start = end - windowSize + 1;
    }
  }

  const range: number[] = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}

export function isValidEmail(email: string) {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Converts error codes from SNAKE_CASE to camelCase
 * Example: INVALID_TWO_FACTOR_COOKIE -> invalidTwoFactorCookie
 */
export function errorCodeToCamelCase(errorCode: string): string {
  return errorCode.toLowerCase().replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

export function getSearchParam(paramName: string) {
  return typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get(paramName) : null;
}

export function getViewByPath<T extends object>(viewPaths: T, path?: string) {
  for (const key in viewPaths) {
    if (viewPaths[key] === path) {
      return key;
    }
  }
}

export function getKeyByValue<T extends Record<string, unknown>>(object: T, value?: T[keyof T]): keyof T | undefined {
  return (Object.keys(object) as Array<keyof T>).find((key) => object[key] === value);
}

export function ensureWithPrefix(value: string, prefix: string) {
  return value.startsWith(prefix) ? value : `${prefix}${value}`;
}

export function ensureWithSuffix(value: string, suffix: string) {
  return value.endsWith(suffix) ? value : `${value}${suffix}`;
}

export function ensureWithoutSuffix(value: string, suffix: string) {
  return value.endsWith(suffix) ? value.slice(0, -suffix.length) : value;
}

export function ensureWithoutPrefix(value: string, prefix: string) {
  return value.startsWith(prefix) ? value.slice(prefix.length) : value;
}

export function ensureRedirectPathname(basePathname: string, redirectPathname: string) {
  // Se o usuário já está na raiz, não precisamos de parâmetro de redirecionamento
  if (!redirectPathname || redirectPathname === '/' || redirectPathname === '') {
    return basePathname;
  }

  const searchParams = new URLSearchParams({
    // 'redirectTo' é o padrão, mas 'callbackUrl' é o que o NextAuth costuma usar
    redirectTo: ensureWithoutSuffix(redirectPathname, '/'),
  });

  // Garante que retorne algo como "/login?redirectTo=/dashboard"
  const cleanBase = ensureWithoutSuffix(basePathname, '/');
  return `${cleanBase}?${searchParams.toString()}`;
}

export function getDictionaryValue(key: string, section: Record<string, any>) {
  // 1. Remove espaços em branco acidentais no início ou fim da chave
  const cleanKey = key.trim();

  // 2. Tenta buscar a tradução
  const value = section[cleanKey];

  if (typeof value !== 'string') {
    console.group(`Tradução Ausente: "${cleanKey}"`);
    console.trace('Origem do erro:'); // Isso vai mostrar o componente no log
    console.groupEnd();
    return cleanKey;
  }

  return value;
}

export function isActivePathname(basePathname: string, currentPathname: string, exactMatch: boolean = false) {
  if (typeof basePathname !== 'string' || typeof currentPathname !== 'string') {
    throw new Error('Both basePathname and currentPathname must be strings');
  }

  if (exactMatch) {
    return basePathname === currentPathname;
  }

  return (
    currentPathname.startsWith(basePathname) &&
    (currentPathname.length === basePathname.length || currentPathname[basePathname.length] === '/')
  );
}

export function titleCaseToCamelCase(titleCaseStr: string) {
  return titleCaseStr
    .normalize('NFD') // Decompõe acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
    .toLowerCase()
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase());
}
