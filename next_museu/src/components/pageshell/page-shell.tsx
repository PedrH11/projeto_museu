import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { DynamicBreadcrumb } from '../layout/dinamic-breadcrumb';

interface PageShellProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
  dynamicPath?: boolean;
  headingId?: string;
}

export function PageShell({ title, description, children, actions, className, dynamicPath = true }: PageShellProps) {
  return (
    <div className={cn('flex flex-col gap-6 p-6 md:p-8 animate-in fade-in duration-500', className)}>
      {/* Área Superior: Breadcrumb + Header */}
      <div className="flex flex-col gap-2 border-b border-border/40 pb-6">
        {/* Breadcrumb Dinâmico inserido aqui */}

        {dynamicPath && <DynamicBreadcrumb />}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-primary">{title}</h1>
            {description && <p className="text-muted-foreground font-sans text-sm md:text-base">{description}</p>}
          </div>

          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      </div>

      {/* Área de Conteúdo */}
      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </div>
  );
}
