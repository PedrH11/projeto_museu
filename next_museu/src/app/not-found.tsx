'use client'; // Recomendado para usar Lucide e botões de navegação

import { Button } from '@/components/ui/button';
import { FileSearch } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
        <FileSearch className="h-10 w-10 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Página não encontrada!</h2>
        <p className="text-muted-foreground max-w-[400px]">
          A página ou recurso que você está procurando não existe ou foi removido do sistema.
        </p>
      </div>

      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="/dashboard">Ir para o início</Link>
        </Button>
      </div>
    </div>
  );
}
