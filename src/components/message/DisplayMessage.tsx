'use client';

import React from 'react';
import { toast } from 'sonner';

export function ToastHandler({ message, type = 'success' }: { message?: string; type?: 'success' | 'error' }) {
  React.useEffect(() => {
    if (message) {
      if (type === 'error') {
        toast.error(message);
      } else {
        toast.success(message);
      }
    }
  }, [message, type]);

  return null;
}
