'use client';

import Link from 'next/link';
import { useDictionary } from '../../service/providers/i18n-providers';
import SalvarUsuarioForm from '../forms/usuario/SalvarUsuarioForm';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function SalvarUsuario() {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="usuarios-heading">
        <PageShell
          title={dict.usuario.management.title}
          description={dict.usuario.management.description}
          actions={
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans">
              <Link href="/dashboard/usuario">{dict.usuario.management.lista_usuario}</Link>
            </Button>
          }
        >
          <SalvarUsuarioForm />
        </PageShell>
      </section>
      ,
    </>
  );
}
