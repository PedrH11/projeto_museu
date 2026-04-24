'use client';

import React, { createContext, useContext } from 'react';
import { DictionaryType } from '../../type/type';
// Ajuste o caminho conforme seu projeto

// Criamos o contexto com valor inicial nulo
const I18nContext = createContext<DictionaryType | null>(null);

export function I18nProvider({ dictionary, children }: { dictionary: DictionaryType; children: React.ReactNode }) {
  return <I18nContext.Provider value={dictionary}>{children}</I18nContext.Provider>;
}

// Hook para acessar os dados em qualquer Client Component
export function useDictionary() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useDictionary deve ser usado dentro de um I18nProvider');
  }
  return context;
}
