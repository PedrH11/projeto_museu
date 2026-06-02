"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  getUsuarioUpdateSchema,
  UsuarioConsultar,
  UsuarioResponse,
} from "../../../schemas/usuario-schemas";
import { useDictionary } from "../../../service/providers/i18n-providers";
import { UploadAvatar } from "../../shared/crop/upload-avatar";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { FormContainer } from "../form-layout";

type UsuarioResponseProps = UsuarioResponse;

export default function ConsultarUsuarioForm({
  usuario,
}: {
  usuario: UsuarioResponseProps;
}) {
  const dict = useDictionary();
  const form = useForm<UsuarioConsultar>({
    resolver: zodResolver(getUsuarioUpdateSchema(dict)),
    values: {
      idUsuario: usuario.idUsuario,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      username: usuario.username,
      email: usuario.email,
      imagePath: usuario.imagePath ?? "",
      roleIds: usuario?.roles?.map((r) => r.idRoles) ?? [],
      roles: usuario.roles,
    },
  });

  return (
    <FormContainer
      title={dict.usuario.form.consult_title}
      description={dict.usuario.form.consult_description}
      formId="form-usuario"
      href="/dashboard/usuario"
      cancel={dict.usuario.form.cancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
        <div className="md:col-span-8 space-y-6">
          {/* GRID INTERNA DE 3 COLUNAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primeiro Nome */}
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.usuario.form.label.firstName}:</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder={dict.usuario.form.label.placeHolderFirstName}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Último Nome */}
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.usuario.form.label.lastName}:</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder={dict.usuario.form.label.placeHolderLastName}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Username */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.usuario.form.label.name}:</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder={dict.usuario.form.label.placeHolderName}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Email - md:col-span-3 faz ele ocupar a linha toda se desejar, ou deixe 1 p/ manter 3 por linha */}
            <div className="md:col-span-1">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{dict.usuario.form.label.email}:</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      value={field.value ?? ""}
                      placeholder={dict.usuario.form.label.placeHolderEmail}
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Roles:
              </span>
              <div className="flex flex-wrap gap-2">
                {usuario.roles?.map((role) => (
                  <div
                    key={role.idRoles}
                    className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors"
                  >
                    {role.nomeRoles}
                  </div>
                ))}
                {(!usuario.roles || usuario.roles.length === 0) && (
                  <span className="text-sm italic text-destructive">
                    Sem permissões
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna do Avatar */}
        <div className="md:col-span-4 flex flex-col items-center justify-start pt-8">
          <UploadAvatar
            type="usuarios"
            onChange={(url) => form.setValue("imagePath", url ?? "")}
          />
        </div>
      </div>
    </FormContainer>
  );
}
