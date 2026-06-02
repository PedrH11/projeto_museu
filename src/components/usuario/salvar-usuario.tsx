"use client";

import { RolesResponse } from "@/schemas/roles-schemas";
import { ApiResponse, PageResponse } from "@/type/api";
import Link from "next/link";
import { useDictionary } from "../../service/providers/i18n-providers";
import SalvarUsuarioForm from "../forms/usuario/SalvarUsuarioForm";
import { PageShell } from "../pageshell/page-shell";
import { Button } from "../ui/button";

interface SalvarUsuarioRolesProps {
  roles: ApiResponse<PageResponse<RolesResponse>>;
}

export function SalvarUsuario({ roles }: SalvarUsuarioRolesProps) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="usuarios-heading">
        <PageShell
          title={dict.usuario.management.title}
          description={dict.usuario.management.description}
          headingId="usuarios-heading"
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
            >
              <Link href="/dashboard/usuario">
                {dict.usuario.management.lista_usuario}
              </Link>
            </Button>
          }
        >
          <SalvarUsuarioForm roles={roles.dados?.content ?? []} />
        </PageShell>
      </section>
      ,
    </>
  );
}
