'use client';

import Link from 'next/link';
import { useDictionary } from '../../service/providers/i18n-providers';
import SalvarRolesForm from '../forms/roles/SalvarRolesForm';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function SalvarRoles() {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="roles-heading">
        <PageShell
          title={dict.roles.management.title}
          description={dict.roles.management.description}
          headingId='roles-heading'
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
          <SalvarRolesForm />
        </PageShell>
      </section>
      ,
    </>
  );
}
