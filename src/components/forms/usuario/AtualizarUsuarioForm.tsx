"use client";

import { RolesResponse } from "@/schemas/roles-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { atualizarUsuarioAction } from "../../../actions/usuario/atualizar-usuario-actions";
import {
  getUsuarioUpdateSchema,
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
import { getRoleColumns } from "../roles/columnsRoles";
import { UniversalPicker } from "./UniversalPicket";

const initialState: ApiResponse<UsuarioResponse> = {
  status: 0,
  mensagem: "",
  erro: null,
  dados: undefined,
  errors: undefined,
};

interface UpdateUsuarioRolesFormProps {
  usuario: UsuarioResponse;
  idUsuario: string;
  roles: RolesResponse[];
}

export default function AtualizarUsuarioForm({
  usuario,
  idUsuario,
  roles,
}: UpdateUsuarioRolesFormProps) {
  const [serverState, serverAction, isPending] = useActionState(
    atualizarUsuarioAction,
    initialState,
  );
  const dict = useDictionary();
  const roleColumns = getRoleColumns(dict);
  const form = useForm<UsuarioUpdate>({
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

  const { getEndpoint } = useResources();
  const urlUpdate = React.useMemo(
    () => getEndpoint("usuario", usuario.idUsuario ?? ""),
    [getEndpoint, usuario.idUsuario],
  );
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingData, setPendingData] = React.useState<UsuarioUpdate | null>(
    null,
  );

  const { status, mensagem, erro, errors } = serverState;

  React.useEffect(() => {
    if (status === 0 || (!mensagem && !erro)) return;

    if (status >= 400) {
      toast.error(erro || mensagem);
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof UsuarioUpdate, {
            type: "server",
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success(mensagem);
    }
  }, [status, mensagem, errors, erro, form]);

  function onSubmit(usuarioUpdate: UsuarioUpdate) {
    try {
      const validatedData = getUsuarioUpdateSchema(dict).parse(usuarioUpdate);
      setPendingData(validatedData);
      setShowConfirmDialog(true);
    } catch (error) {
      console.error("Validação falhou", error);
    }
  }

  function handleConfirm() {
    if (!idUsuario) return toast.error(dict.usuario.management.id_not_found);
    if (!urlUpdate) return toast.error(dict.app.endpoint.api_resources);
    if (!pendingData) return;

    startTransition(async () => {
      try {
        serverAction({
          id: idUsuario,
          usuarioUpdate: pendingData,
          url: urlUpdate,
        });
      } finally {
        setShowConfirmDialog(false);
        setPendingData(null); // Limpa o estado após o uso
      }
    });
  }

  React.useEffect(() => {
    form.register("imagePath");
  }, [form]);

  const rolesPickerData = roles.map((role) => ({
    ...role,
    id: role.idRoles,
  }));

  return (
    <>
      <FormContainer
        title={dict.usuario.form.edit_title}
        description={dict.usuario.form.edit_description}
        state={serverState}
        isPending={isPending}
        formId="form-usuario"
        onSubmit={form.handleSubmit(onSubmit)}
        action={dict.usuario.form.action}
        confirm={dict.usuario.form.confirm}
        href="/dashboard/usuario"
        cancel={dict.usuario.form.cancel}
        ariaLabelCon={dict.usuario.management.action_edit}
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
              <div className="md:col-span-3 pt-4">
                <Controller
                  name="roleIds"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const selectedIds = field.value?.map(String) || [];
                    const handleSelectionChange = (ids: string[]) =>
                      field.onChange(ids.map(Number));
                    const selectedRolesNames = roles
                      .filter((r) => field.value?.includes(r.idRoles))
                      .map((r) => r.nomeRoles);

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Atribuir Roles:</FieldLabel>
                        <div className="flex flex-col gap-3">
                          <UniversalPicker
                            title="Selecionar Roles"
                            data={rolesPickerData}
                            columns={roleColumns}
                            selectedIds={selectedIds}
                            onSelectionChange={handleSelectionChange}
                          />
                          <div className="flex flex-wrap gap-2">
                            {selectedRolesNames.length > 0 ? (
                              selectedRolesNames.map((name) => (
                                <span
                                  key={name}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20"
                                >
                                  {name}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground italic">
                                Nenhuma role selecionada.
                              </span>
                            )}
                          </div>
                        </div>
                        {fieldState.error && (
                          <FieldError>{fieldState.error.message}</FieldError>
                        )}
                      </Field>
                    );
                  }}
                />
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
