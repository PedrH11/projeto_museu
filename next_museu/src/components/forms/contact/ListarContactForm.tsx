'use client';

import { DataTable } from '@/components/shared/datatable/data-table';
import React from 'react';
import { ContactResponse } from '../../../schemas/contact-schema';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { ApiResponse, PageResponse } from '../../../type/api';
import { ToastHandler } from '../../message/DisplayMessage';
import { PageShell } from '../../shared/pageshell/page-shell';
import { getContactColumns } from './columnsUIContactDataTable';

export default function ListarContactForm({
  result,
}: {
  result: ApiResponse<PageResponse<ContactResponse>>;
}) {
  const dict = useDictionary();
  const columnsContact = React.useMemo(
    () => getContactColumns(result),
    [result],
  );
  return (
    <section aria-labelledby="usuarios-heading">
      {result.mensagem && <ToastHandler message={result.mensagem} />}
      <PageShell
        title={dict.contact.management.title}
        description={dict.contact.management.description}
        headingId="usuarios-heading"
      >
        {/* Tabela de Dados */}
        <div className="rounded-xl border bg-card shadow-sm p-1">
          <DataTable
            columns={columnsContact}
            data={result.dados?.content ?? []}
            pageCount={result.dados?.totalPages ?? 0}
            pageIndex={(result.dados?.page ?? 1) - 1}
            pageSize={result.dados?.pageSize ?? 5}
          ></DataTable>
        </div>
      </PageShell>
    </section>
  );
}
