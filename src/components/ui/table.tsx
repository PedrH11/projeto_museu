'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        // Fonte Sans para os dados da tabela (melhor legibilidade)
        className={cn('w-full caption-bottom text-sm font-sans', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      // Fundo levemente azulado para destacar o cabeçalho
      className={cn('[&_tr]:border-b bg-muted/30', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('bg-primary/5 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      // Hover sutil usando a cor Primária (Azul Marinho)
      className={cn('hover:bg-primary/5 data-[state=selected]:bg-muted border-b transition-colors', className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      // Títulos em Azul Marinho (Primary) e Negrito
      className={cn(
        'text-primary h-12 px-2 text-left align-middle font-bold uppercase tracking-wider whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      // Texto em cinza azulado para leitura confortável
      className={cn(
        'p-4 align-middle text-foreground/90 whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      // Fonte Serifada (Lora) para a legenda da tabela, dando o toque de Museu
      className={cn('text-muted-foreground mt-4 text-sm font-serif italic', className)}
      {...props}
    />
  );
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
