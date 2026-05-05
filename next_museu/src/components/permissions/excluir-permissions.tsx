'use client';

import Link from 'next/link';
import { PermissionsResponse } from '../../schemas/permissions-schemas';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse } from '../../type/api';
import ExcluirPermissionsForm from '../forms/permissions/ExcluirPermissionsForm';
import { ToastHandler } from '../message/DisplayMessage';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function ExcluirPermissions({
  idPermissions,
  result,
}: {
  idPermissions: string;
  result: ApiResponse<PermissionsResponse>;
}) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="permissions-heading">
        {result.mensagem && <ToastHandler message={result.mensagem} />}
        <PageShell
          title={dict.permissions.management.title}
          description={dict.permissions.management.description}
          headingId="permissions-heading"
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
              aria-label={dict.permissions.management.action_delete}
            >
              <Link href="/dashboard/permissions">
                {dict.permissions.management.lista_permissions}
              </Link>
            </Button>
          }
        >
          {result.dados ? (
            <ExcluirPermissionsForm permissions={result.dados} idPermissions={idPermissions} />
          ) : (
            <div className="p-4 text-center border rounded-lg bg-muted">
              <p>{dict.permissions.management.not_found}</p>
            </div>
          )}
        </PageShell>
      </section>
      ,
    </>
  );
}
