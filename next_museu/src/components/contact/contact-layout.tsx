'use client';

import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { Card, CardContent } from '../ui/card';

type ContactProps = ComponentProps<'div'>;

export function Contact({ className, children, ...props }: ContactProps) {
  return (
    <div className="flex min-h-0 items-center justify-center p-2">
      <Card className="w-full max-w-4xl mx-auto p-4 md:p-8 shadow-lg rounded-2xl h-auto">
        <CardContent>
          <section className={cn('container w-full flex justify-center px-0', className)} {...props}>
            <div className="w-full flex justify-center">
              <div className="w-full max-w-5xl px-6 py-6 space-y-6">{children}</div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

export function ContactHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('space-y-2 text-center', className)} {...props} />;
}

export function ContactTitle({ className, ...props }: ComponentProps<'h1'>) {
  return <h1 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />;
}

export function ContactDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

export function ContactForm({ className, ...props }: ComponentProps<'div'>) {
  return <div className={className} {...props} />;
}

export function ContactFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('grid gap-6', className)} {...props} />;
}
