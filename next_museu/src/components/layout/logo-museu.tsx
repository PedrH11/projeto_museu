'use client';

import { cn } from '@/lib/utils';
import { Lora } from 'next/font/google';
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' }); // Certifique-se de que a fonte Lora está configurada

export function LogoMuseu({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 px-2', className)}>
      {/* Ícone SVG Estilizado */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-primary-foreground"
        >
          {/* Coroa Mural (Simbolizando a Cidade) */}
          <path d="M3 8V4h4l2 2h6l2-2h4v4" />
          {/* Portal do Museu */}
          <path d="M4 21V10c0-1 1-2 2-2h12c1 0 2 1 2 2v11" />
          {/* Engrenagem/Pão (Símbolo de Birigui + Engenharia) */}
          <circle cx="12" cy="14" r="3" />
          <path d="M12 11v1" />
          <path d="M12 16v1" />
          <path d="M9 14h1" />
          <path d="M14 14h1" />
        </svg>
      </div>

      {/* Identidade Nominal */}
      <div className="flex flex-col leading-none">
        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Museu Virtual</span>
        <span
          className={cn(
            'text-lg font-bold text-primary',
            lora.className, // Aplica a fonte Serifada para o nome da cidade
          )}
        >
          de Birigui
        </span>
      </div>
    </div>
  );
}
