import { cookies } from 'next/headers';
import 'server-only';
import { defaultSettings } from '../service/context/settings-context';
import { DictionaryType, LocaleType } from '../type/type';

const dictionaries = {
  en: () =>
    import('@/configs/dictionary/en.json').then((module) => module.default),
  pt: () =>
    import('@/configs/dictionary/pt.json').then((module) => module.default),
  es: () =>
    import('@/configs/dictionary/es.json').then((module) => module.default),
};

/**
 * Carrega o dicionário baseado no locale.
 * Centraliza a lógica de erro e fallback.
 */
const DEFAULT_LOCALE: LocaleType = 'pt';

/**
 * Lógica central para extrair o locale dos cookies.
 */
async function getLocaleFromCookies(): Promise<LocaleType> {
  try {
    const cookieStore = await cookies();
    const settings = JSON.parse(cookieStore.get('settings')?.value || '{}');
    return settings.locale ?? defaultSettings.locale;
  } catch (error) {
    // Erros de parsing ou cookies ausentes retornam o padrão
    return defaultSettings.locale;
  }
}

/**
 * Busca o dicionário. Se falhar, garante o retorno do idioma padrão.
 */
export async function getDictionary(
  locale: LocaleType,
): Promise<DictionaryType> {
  const loadDictionary = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];

  try {
    return (await loadDictionary()) as DictionaryType;
  } catch (error) {
    console.error(
      `Falha ao carregar [${locale}], usando fallback [${DEFAULT_LOCALE}]:`,
      error,
    );
    return (await dictionaries[DEFAULT_LOCALE]()) as DictionaryType;
  }
}

/**
 * Função Mestre: Resolve locale e dicionário simultaneamente.
 * Ideal para alimentar o <Providers /> no layout raiz.
 */
export async function getI18nData() {
  const locale = await getLocaleFromCookies();
  const dict = await getDictionary(locale);
  return { locale, dict };
}

// --- Atalhos de conveniência ---

export const getServerDictionary = async () => (await getI18nData()).dict;

// Renomeado ou mantido para compatibilidade com seu código
export const getClientDictionary = getI18nData;
