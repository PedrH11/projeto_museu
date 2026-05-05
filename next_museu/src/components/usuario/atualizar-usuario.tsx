"use client";

import Link from "next/link";

import { RolesResponse } from "@/schemas/roles-schemas";
import { ApiResponse, PageResponse } from "@/type/api";
import { UsuarioResponse } from "../../schemas/usuario-schemas";
import { useDictionary } from "../../service/providers/i18n-providers";
import AtualizarUsuarioForm from "../forms/usuario/AtualizarUsuarioForm";
import { ToastHandler } from "../message/DisplayMessage";
import { PageShell } from "../pageshell/page-shell";
import { Button } from "../ui/button";

interface UpdateUsuarioRolesProps {
  result: ApiResponse<UsuarioResponse>;
  idUsuario: string;
  roles: ApiResponse<PageResponse<RolesResponse>>;
}

export function AtualizarUsuario({
  result,
  idUsuario,
  roles,
}: UpdateUsuarioRolesProps) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="usuarios-heading">
        {result.mensagem && <ToastHandler message={result.mensagem} />}
        <PageShell
          title={dict.usuario.management.title}
          description={dict.usuario.management.description}
          headingId="usuarios-heading"
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
              aria-label={dict.usuario.management.action_edit}
            >
              <Link href="/dashboard/usuario">
                {dict.usuario.management.lista_usuario}
              </Link>
            </Button>
          }
        >
          {result.dados ? (
            <AtualizarUsuarioForm
              usuario={result.dados}
              idUsuario={idUsuario}
              roles={roles.dados?.content ?? []}
            />
          ) : (
            <div className="p-4 text-center border rounded-lg bg-muted">
              <p>{dict.usuario.management.not_found}</p>
            </div>
          )}
        </PageShell>
      </section>
    </>
  );
}
