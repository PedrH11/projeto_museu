'use client';

import { DataTable } from '@/components/shared/datatable/data-table';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, UserPlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ToastHandler } from '../../../components/message/DisplayMessage';
import { PageShell } from '../../../components/shared/pageshell/page-shell';
import { RolesResponse } from '../../../schemas/roles-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { ApiResponse, PageResponse } from '../../../type/api';
import { getRolesColumns } from './ColumnsPermissionsDataTable';

export default function ListarRolesForm({
  result,
}: {
  result: ApiResponse<PageResponse<RolesResponse>>;
}) {
  const dict = useDictionary();
  const columnsRoles = React.useMemo(() => getRolesColumns(result), [result]);
  const canCreate = !!result._links?.create;
  return (
    <section aria-labelledby="usuarios-heading">
      {result.mensagem && <ToastHandler message={result.mensagem} />}
      <PageShell
        title={dict.roles.management.title}
        description={dict.roles.management.description}
        headingId="usuarios-heading"
        actions={
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {dict.navigation.dashboards}
            </Link>
          </Button>
        }
      >
        {/* Tabela de Dados */}
        <div className="rounded-xl border bg-card shadow-sm p-1">
          <DataTable
            columns={columnsRoles}
            data={result.dados?.content ?? []}
            pageCount={result.dados?.totalPages ?? 0}
            pageIndex={(result.dados?.page ?? 1) - 1}
            pageSize={result.dados?.pageSize ?? 5}
          >
            {canCreate && (
              <Button
                asChild
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
                aria-label="Botão para adicionar novo usuário"
              >
                <Link href="/dashboard/usuario/novo">
                  <UserPlus className="mr-2 h-4 w-4" />
                  {dict.roles.form.new_roles}
                </Link>
              </Button>
            )}
          </DataTable>
        </div>
      </PageShell>
    </section>
  );
}
