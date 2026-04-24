export type FormState = {
  success?: boolean;
  message?: string; // Mensagem geral para o Toast (Sucesso ou Erro)
  errors?: Record<string, string[]>; // Erros do Zod mapeados por campo
  data?: unknown;
  apiError?: string;
};
