'use client';

import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { ResourcesResponse } from '../../schemas/resources-schemas';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse, PageResponse } from '../../type/api';
import PermissionMatrixForm from '../forms/permissions/PermissionsMatrixForm';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export default function PermissionsMatriz({
  nomeRole,
  resources,
}: {
  nomeRole: string;
  resources: ApiResponse<PageResponse<ResourcesResponse>>;
}) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="permissions-heading">
        <PageShell
          title={dict.permissions.management.title}
          description={dict.permissions.management.description}
          headingId="permissions-heading"
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
          <PermissionMatrixForm
            nomeRoles={nomeRole}
            resources={resources.dados?.content ?? []}
          />
        </PageShell>
      </section>
    </>
  );
}
