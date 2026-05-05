'use client';

import Link from 'next/link';
import { PermissionsResponse } from '../../schemas/permissions-schemas';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse } from '../../type/api';
import ConsultarPermissionsForm from '../forms/permissions/ConsultarPermissionsForm';
import { ToastHandler } from '../message/DisplayMessage';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function ConsultarPermissions({
  result,
}: {
  result: ApiResponse<PermissionsResponse>;
}) {
  const dict = useDictionary();
  console.log(JSON.stringify(result, null, 2));
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
              aria-label={dict.permissions.management.action_consult}
            >
              <Link href="/dashboard/permissions">
                {dict.permissions.management.lista_permissions}
              </Link>
            </Button>
          }
        >
          {result.dados ? (
            <ConsultarPermissionsForm permissions={result.dados} />
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
