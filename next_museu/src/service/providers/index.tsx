'use client';

//import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { DictionaryType, LocaleType } from '../../type/type';
import { SettingsProvider } from '../context/settings-context';
import AuthProvider from './auth-providers';
import { I18nProvider } from './i18n-providers';
import { ResourceProvider } from './resource-providers';

interface ProvidersProps {
  children: ReactNode;
  locale: LocaleType;
  dictionary: DictionaryType; // O JSON de tradução
}

export function Providers({ locale, dictionary, children }: ProvidersProps) {
  return (
    <SettingsProvider locale={locale}>
      <I18nProvider dictionary={dictionary}>
        <ResourceProvider>
          <AuthProvider>{children}</AuthProvider>
        </ResourceProvider>
      </I18nProvider>
    </SettingsProvider>
  );
}
