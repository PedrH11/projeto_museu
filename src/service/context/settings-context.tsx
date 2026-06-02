'use client';

import type { ReactNode } from 'react';
import React from 'react';
import { useCookie } from 'react-use';
import { LocaleType, SettingsType } from '../../type/type';

export const defaultSettings: SettingsType = {
  theme: 'zinc',
  mode: 'system',
  radius: 0.5,
  layout: 'vertical',
  locale: 'pt', // Alterado para seu padrão
};

export const SettingsContext = React.createContext<
  | {
      settings: SettingsType;
      updateSettings: (newSettings: SettingsType) => void;
      resetSettings: () => void;
    }
  | undefined
>(undefined);

export function SettingsProvider({ locale, children }: { locale: LocaleType; children: ReactNode }) {
  const [storedSettings, setStoredSettings, deleteStoredSettings] = useCookie('settings');

  const settings: SettingsType = React.useMemo(() => {
    try {
      const parsed = storedSettings ? JSON.parse(storedSettings) : defaultSettings;
      // IMPORTANTE: Forçamos o locale vindo da URL (props) para manter sincronia com o dicionário
      return { ...parsed, locale };
    } catch {
      return { ...defaultSettings, locale };
    }
  }, [storedSettings, locale]);

  const updateSettings = React.useCallback(
    (newSettings: SettingsType) => {
      setStoredSettings(JSON.stringify(newSettings), { expires: 365 });
    },
    [setStoredSettings],
  );

  const resetSettings = React.useCallback(() => {
    deleteStoredSettings();
  }, [deleteStoredSettings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>{children}</SettingsContext.Provider>
  );
}
