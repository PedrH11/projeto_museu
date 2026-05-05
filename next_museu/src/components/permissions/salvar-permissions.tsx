'use client';

import Link from 'next/link';
import { ResourcesResponse } from '../../schemas/resources-schemas';
import { RolesResponse } from '../../schemas/roles-schemas';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse, PageResponse } from '../../type/api';
import SalvarPermissionsForm from '../forms/permissions/SalvarPermissionsForm';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

interface SalvarPermissionsProps {
  roles: ApiResponse<PageResponse<RolesResponse>>;
  resources: ApiResponse<PageResponse<ResourcesResponse>>;
}

export function SalvarPermissions({
  roles,
  resources,
}: SalvarPermissionsProps) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="permissions-heading">
        <PageShell
          title={dict.permissions.management.title}
          description={dict.permissions.management.description}
          headingId='permissions-heading'
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
              aria-label={dict.permissions.management.action_new}
            >
              <Link href="/dashboard/permissions">
                {dict.permissions.management.lista_permissions}
              </Link>
            </Button>
          }
        >
          <SalvarPermissionsForm
            roles={roles.dados?.content ?? []}
            resources={resources.dados?.content ?? []}
          />
        </PageShell>
      </section>
      ,
    </>
  );
}
