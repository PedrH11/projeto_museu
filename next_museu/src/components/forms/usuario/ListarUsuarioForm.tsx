'use client';

import { DataTable } from '@/components/shared/datatable/data-table';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, UserPlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { UsuarioResponse } from '../../../schemas/usuario-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { ApiResponse, PageResponse } from '../../../type/api';
import { ToastHandler } from '../../message/DisplayMessage';
import { PageShell } from '../../shared/pageshell/page-shell';
import { getUsuarioColumns } from './ColumnsUIsuarioDataTable';

export default function ListarUsuarioForm({
  result,
}: {
  result: ApiResponse<PageResponse<UsuarioResponse>>;
}) {
  const dict = useDictionary();
  const columnsUsuario = React.useMemo(
    () => getUsuarioColumns(result),
    [result],
  );
  const canCreate = !!result._links?.create;
  return (
    <section aria-labelledby="usuarios-heading">
      {result.mensagem && <ToastHandler message={result.mensagem} />}
      <PageShell
        title={dict.usuario.management.title}
        description={dict.usuario.management.description}
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
            columns={columnsUsuario}
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
                  {dict.usuario.form.new_user}
                </Link>
              </Button>
            )}
          </DataTable>
        </div>
      </PageShell>
    </section>
  );
}
