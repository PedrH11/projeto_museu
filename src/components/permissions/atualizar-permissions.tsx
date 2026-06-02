"use client";

import Link from "next/link";

import { ResourcesResponse } from "@/schemas/resources-schemas";
import { RolesResponse } from "@/schemas/roles-schemas";
import { PermissionsResponse } from "../../schemas/permissions-schemas";
import { useDictionary } from "../../service/providers/i18n-providers";
import { ApiResponse, PageResponse } from "../../type/api";
import AtualizarPermissionsForm from "../forms/permissions/AtualizarPermissionsForm";
import { ToastHandler } from "../message/DisplayMessage";
import { PageShell } from "../pageshell/page-shell";
import { Button } from "../ui/button";

interface AtualizarPermissionsProps {
  idPermissions: string;
  result: ApiResponse<PermissionsResponse>;
  roles: ApiResponse<PageResponse<RolesResponse>>;
  resources: ApiResponse<PageResponse<ResourcesResponse>>;
}

export function AtualizarPermissions({
  idPermissions,
  result,
  roles,
  resources,
}: AtualizarPermissionsProps) {
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
            >
              <Link href="/dashboard/permissions">
                {dict.permissions.management.lista_permissions}
              </Link>
            </Button>
          }
        >
          {result.dados ? (
            <AtualizarPermissionsForm
              idPermissions={idPermissions}
              permissions={result.dados}
              roles={roles.dados?.content ?? []}
              resources={resources.dados?.content ?? []}
            />
          ) : (
            <div className="p-4 text-center border rounded-lg bg-muted">
              <p>{dict.permissions.management.not_found}</p>
            </div>
          )}
        </PageShell>
      </section>
    </>
  );
}
