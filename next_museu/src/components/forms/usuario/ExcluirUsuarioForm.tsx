"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { excluirUsuarioAction } from "../../../actions/usuario/excluir-usuario-actions";
import {
  getUsuarioUpdateSchema,
  UsuarioDelete,
  UsuarioResponse,
  UsuarioUpdate,
} from "../../../schemas/usuario-schemas";
import { useDictionary } from "../../../service/providers/i18n-providers";
import { useResources } from "../../../service/providers/resource-providers";
import { ApiResponse } from "../../../type/api";
import { UploadAvatar } from "../../shared/crop/upload-avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { FormContainer } from "../form-layout";

const initialState: ApiResponse<UsuarioResponse> = {
  status: 0,
  mensagem: "",
  erro: null,
  dados: undefined,
  errors: undefined,
};

type UsuarioResponseProps = UsuarioResponse;

export default function ExcluirUsuarioForm({
  idUsuario,
  usuario,
}: {
  idUsuario: string;
  usuario: UsuarioResponseProps;
}) {
  const [state, action, isPending] = useActionState(
    excluirUsuarioAction,
    initialState,
  );
  const dict = useDictionary();
  const form = useForm<UsuarioDelete>({
    resolver: zodResolver(getUsuarioUpdateSchema(dict)),
    defaultValues: {
      idUsuario: usuario.idUsuario,
      username: usuario.username,
      email: usuario.email,
      imagePath: usuario.imagePath ?? "",
    },
  });

  const { getEndpoint } = useResources();
  const urlDelete = React.useMemo(
    () => getEndpoint("usuario", usuario.idUsuario ?? ""),
    [getEndpoint, usuario.idUsuario],
  );

  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingData, setPendingData] = React.useState<UsuarioDelete | null>(
    null,
  );

  const { status, mensagem, erro, errors } = state;

  React.useEffect(() => {
    if (status === 0) return;

    if (status >= 400) {
      toast.error("Erro", { description: erro || mensagem });
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof UsuarioUpdate, {
            type: "server",
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success("Sucesso!", { description: mensagem });
    }
  }, [status, mensagem, errors, erro, form]);

  function onSubmit(usuarioDelete: UsuarioDelete) {
    if (idUsuario === undefined || idUsuario === null) {
      return toast.error(dict.usuario.management.id_not_found);
    }
    setPendingData(usuarioDelete);
    setShowConfirmDialog(true);
  }

  function handleConfirm() {
    if (!urlDelete) return toast.error(dict.app.endpoint.api_resources);
    if (pendingData) {
      startTransition(() => {
        action({ id: Number(idUsuario), url: urlDelete });
      });
    }
    setShowConfirmDialog(false);
  }

  React.useEffect(() => {
    form.register("imagePath");
  }, [form]);

  return (
    <>
      <FormContainer
        title={dict.usuario.form.delete_title}
        description={dict.usuario.form.delete_description}
        state={state}
        isPending={isPending}
        formId="form-usuario"
        onSubmit={form.handleSubmit(onSubmit)}
        action={dict.usuario.form.action}
        confirm={dict.usuario.form.confirm}
        href="/dashboard/usuario"
        cancel={dict.usuario.form.cancel}
        ariaLabelCon={dict.usuario.management.action_delete}
        ariaLabelCancel={dict.usuario.management.action_cancel}
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
                    <FieldLabel>
                      {dict.usuario.form.label.firstName}:
                    </FieldLabel>
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
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dict.usuario.form.confirm_title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dict.usuario.form.confirm_description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingData(null)}>
              {dict.usuario.form.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {dict.usuario.form.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
