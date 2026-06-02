'use client';

import type { ReactNode } from 'react';
import { toast as sonnerToast } from 'sonner';

// Tipagem baseada nas propriedades do Sonner, mantendo compatibilidade
interface ToastProps {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  duration?: number;
  onOpenChange?: (open: boolean) => void;
  [key: string]: any; // Para aceitar outras props do Sonner (promise, error, etc)
}

function toast({ title, description, action, ...props }: ToastProps) {
  // O Sonner usa o primeiro argumento como título e o segundo como objeto de configuração
  const id = sonnerToast(title, {
    description,
    action,
    onAutoClose: () => props.onOpenChange?.(false),
    onDismiss: () => props.onOpenChange?.(false),
    ...props,
  });

  return {
    id,
    dismiss: () => sonnerToast.dismiss(id),
    // Sonner permite atualizar chamando o toast novamente com o mesmo ID
    update: (newProps: ToastProps) => sonnerToast(newProps.title || title, { id, ...newProps }),
  };
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
    // O Sonner não expõe a lista de toasts da mesma forma que o reducer manual,
    // pois ele gerencia isso internamente no componente <Toaster />.
  };
}

export { toast, useToast };
