'use client';

import Link from 'next/link';

import { RolesResponse } from '../../schemas/roles-schemas';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse } from '../../type/api';
import AtualizarRolesForm from '../forms/roles/AtualizarRolesForm';
import { ToastHandler } from '../message/DisplayMessage';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function AtualizarRoles({
  result,
  idRoles,
}: {
  idRoles: string;
  result: ApiResponse<RolesResponse>;
}) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="roless-heading">
        {result.mensagem && <ToastHandler message={result.mensagem} />}
        <PageShell
          title={dict.roles.management.title}
          description={dict.roles.management.description}
          headingId="roless-heading"
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
            >
              <Link href="/dashboard/roles">
                {dict.roles.management.lista_roles}
              </Link>
            </Button>
          }
        >
          {result.dados ? (
            <AtualizarRolesForm roles={result.dados} idRoles={idRoles} />
          ) : (
            <div className="p-4 text-center border rounded-lg bg-muted">
              <p>{dict.roles.management.not_found}</p>
            </div>
          )}
        </PageShell>
      </section>
    </>
  );
}
