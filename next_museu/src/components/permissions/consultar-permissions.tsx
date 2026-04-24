'use client';

import Link from 'next/link';
import { UsuarioResponse } from '../../schemas/usuario-schemas';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse } from '../../type/api';
import ConsultarUsuarioForm from '../forms/usuario/ConsultarUsuarioForm';
import { ToastHandler } from '../message/DisplayMessage';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function ConsultarUsuario({
  result,
}: {
  result: ApiResponse<UsuarioResponse>;
}) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="usuarios-heading">
        {result.mensagem && <ToastHandler message={result.mensagem} />}
        <PageShell
          title={dict.usuario.management.title}
          description={dict.usuario.management.description}
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
            >
              <Link href="/dashboard/usuario">
                {dict.usuario.management.lista_usuario}
              </Link>
            </Button>
          }
        >
          {result.dados ? (
            <ConsultarUsuarioForm usuario={result.dados} />
          ) : (
            <div className="p-4 text-center border rounded-lg bg-muted">
              <p>{dict.usuario.management.not_found}</p>
            </div>
          )}
        </PageShell>
      </section>
      ,
    </>
  );
}
