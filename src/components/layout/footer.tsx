'use client';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';
import { useDictionary } from '../../service/providers/i18n-providers';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const dict = useDictionary();
  return (
    <footer className="bg-background border-t border-sidebar-border">
      <div className="container flex justify-between items-center p-4 md:px-6">
        <p className="text-xs text-muted-foreground md:text-sm">
          © {currentYear}{' '}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'link' }), 'inline p-0')}
          >
            Shadboard
          </a>
          .
        </p>
        <p className="text-xs text-muted-foreground md:text-sm">
          {dict.project.designed}{' '}
          <a
            href="https://bri.ifsp.edu.br"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'link' }), 'inline p-0')}
          >
            : {dict.project.institution}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
