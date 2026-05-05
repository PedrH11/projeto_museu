'use client';

import Link from 'next/link';
import { UsuarioResponse } from '../../schemas/usuario-schemas';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse } from '../../type/api';
import ExcluirUsuarioForm from '../forms/usuario/ExcluirUsuarioForm';
import { ToastHandler } from '../message/DisplayMessage';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function ExcluirUsuario({
  idUsuario,
  result,
}: {
  idUsuario: string;
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
          headingId="usuarios-heading"
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
              aria-label={dict.usuario.management.action_delete}
            >
              <Link href="/dashboard/usuario">
                {dict.usuario.management.lista_usuario}
              </Link>
            </Button>
          }
        >
          {result.dados ? (
            <ExcluirUsuarioForm usuario={result.dados} idUsuario={idUsuario} />
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
