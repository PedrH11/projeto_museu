'use client';

import Link from 'next/link';
import { ResourcesResponse } from '../../schemas/resources-schemas';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse } from '../../type/api';
import ConsultarResourcesForm from '../forms/resources/ConsultarResourcesForm';
import { ToastHandler } from '../message/DisplayMessage';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function ConsultarResources({
  result,
}: {
  result: ApiResponse<ResourcesResponse>;
}) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="resources-heading">
        {result.mensagem && <ToastHandler message={result.mensagem} />}
        <PageShell
          title={dict.resources.management.title}
          description={dict.resources.management.description}
          headingId="resources-heading"
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
            >
              <Link href="/dashboard/resources">
                {dict.resources.management.lista_resources}
              </Link>
            </Button>
          }
        >
          {result.dados ? (
            <ConsultarResourcesForm resources={result.dados} />
          ) : (
            <div className="p-4 text-center border rounded-lg bg-muted">
              <p>{dict.resources.management.not_found}</p>
            </div>
          )}
        </PageShell>
      </section>
      ,
    </>
  );
}
