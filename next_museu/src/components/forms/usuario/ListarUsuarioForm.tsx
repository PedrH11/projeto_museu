'use client';

import { DataTable } from '@/components/shared/datatable/data-table';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dict = useDictionary();
  const columnsUsuario = React.useMemo(
    () => getUsuarioColumns(result, dict),
    [result, dict],
  );
  const canCreate = !!result._links?.create;

  const handlePagination = (
    pageIndex: number,
    pageSize: number,
    field?: string,
    order?: string,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (pageIndex + 1).toString());
    params.set('pageSize', pageSize.toString());
    if (field && order) {
      params.set('field', field);
      params.set('order', order);
    } else {
      params.delete('field');
      params.delete('order');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
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
            aria-label={dict.navigation.back_dashboards}
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
            onParamsChange={handlePagination}
            field={result.dados?.fields}
            order={result.dados?.order}
          >
            {canCreate && (
              <Button
                asChild
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
                aria-label={dict.usuario.management.action_new}
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
