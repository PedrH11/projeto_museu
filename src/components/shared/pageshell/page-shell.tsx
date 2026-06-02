import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { DynamicBreadcrumb } from '../../layout/dinamic-breadcrumb';

interface PageShellProps {
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
  headingId?: string;
}

export function PageShell({ title, description, children, actions, className, headingId }: PageShellProps) {
  return (
    <div className={cn('flex flex-col gap-4 p-4 md:p-6 animate-in fade-in duration-500', className)}>
      {/* Área Superior: Breadcrumb + Header */}
      <div className="flex flex-col gap-1 border-b border-border/40 pb-4">
        {/* Breadcrumb Dinâmico inserido aqui */}
        <DynamicBreadcrumb />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 id={headingId} className="text-3xl font-serif font-bold tracking-tight text-primary">
              {title}
            </h1>
            {description && <p className="text-muted-foreground font-sans text-sm md:text-base">{description}</p>}
          </div>

          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      </div>

      {/* Área de Conteúdo */}
      <div className="flex flex-1 flex-col gap-1">{children}</div>
    </div>
  );
}
