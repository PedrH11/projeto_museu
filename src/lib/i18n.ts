import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { i18n } from '../configs/i18n';
import { LocaleType } from '../type/type';

/**
 * Como removemos o idioma da URL, o pathname nunca "perde" o locale visualmente.
 * Retornamos sempre false para evitar redirecionamentos de prefixo.
 */
export function isPathnameMissingLocale(pathname: string) {
  return false;
}

/**
 * O idioma agora vem de Cookies, não do Pathname.
 */
export function getLocaleFromPathname(pathname: string) {
  return undefined;
}

/**
 * Retorna o pathname original sem modificações de prefixo.
 */
export function ensureLocalizedPathname(pathname: string, locale: string) {
  return pathname || '/';
}

/**
 * Se a URL não tem mais locale, essa função apenas retorna o pathname.
 */
export function relocalizePathname(pathname: string, locale: string) {
  return pathname;
}

/**
 * Pega o idioma preferido.
 * Ordem: Cookie 'settings' -> Cookie 'NEXT_LOCALE' -> Header Navegador -> Default
 */
export function getPreferredLocale(request: NextRequest) {
  // 1. Tenta pegar do seu cookie customizado de settings
  const settingsCookie = request.cookies.get('settings')?.value;
  // 2. Tenta pegar do cookie padrão do Next.js (se existir)
  const nextLocaleCookie = request.cookies.get('NEXT_LOCALE')?.value;

  try {
    if (settingsCookie) {
      const parsedSettings = JSON.parse(settingsCookie);
      if (parsedSettings?.locale) return parsedSettings.locale as LocaleType;
    }

    if (nextLocaleCookie && i18n.locales.includes(nextLocaleCookie as any)) {
      return nextLocaleCookie as LocaleType;
    }
  } catch (error) {
    console.error('Erro ao processar cookies de idioma', error);
  }

  // 3. Fallback para detecção do navegador
  const supportedLocales = [...i18n.locales];
  const preferredLocales = new Negotiator({
    headers: Object.fromEntries(request.headers.entries()),
  }).languages(supportedLocales);

  const locale = match(preferredLocales, supportedLocales, i18n.defaultLocale);

  return locale as LocaleType;
}
