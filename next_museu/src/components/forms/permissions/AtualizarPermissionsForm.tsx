"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ResourcesResponse } from "@/schemas/resources-schemas";
import { RolesResponse } from "@/schemas/roles-schemas";

import { atualizarPermissionsAction } from "@/actions/permissions/atualizar-permissions-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Action } from "@/lib/action.enum";
import { Possession } from "@/lib/possession.enum";
import { UniversalPicker } from "@/lib/universal-picker";
import {
  getPermissionsSchema,
  PermissionsResponse,
  PermissionsUpdate,
} from "@/schemas/permissions-schemas";
import { useDictionary } from "../../../service/providers/i18n-providers";
import { useResources } from "../../../service/providers/resource-providers";
import { ApiResponse } from "../../../type/api";
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
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { FormContainer } from "../form-layout";
import { getResourcesColumns } from "../resources/columnsResources";
import { getRoleColumns } from "../roles/columnsRoles";

const initialState: ApiResponse<PermissionsResponse> = {
  status: 0,
  mensagem: "",
  erro: null,
  dados: undefined,
  errors: undefined,
};

interface AtualizarPermissionsFormProps {
  idPermissions: string;
  roles: RolesResponse[];
  resources: ResourcesResponse[];
  permissions: PermissionsResponse;
}

export default function AtualizarPermissionsForm({
  idPermissions,
  roles,
  resources,
  permissions,
}: AtualizarPermissionsFormProps) {
  const [serverState, serverAction, isPending] = useActionState(
    atualizarPermissionsAction,
    initialState,
  );

  const dict = useDictionary();
  const roleColumns = getRoleColumns(dict);
  const resourcesColumns = getResourcesColumns(dict);
  const form = useForm<PermissionsUpdate>({
    resolver: zodResolver(getPermissionsSchema(dict)),
    values: {
      idPermissions: permissions.idPermissions,
      roleId: permissions.role.idRoles,
      resourceId: permissions.resource.idResources,
      nomeRoles: permissions.role.nomeRoles,
      action: permissions.action,
      possession: permissions.possession,
      nomeResources: permissions.resource.nomeResources,
      role: permissions.role,
      resource: permissions.resoruce,
    },
  });

  const { getEndpoint } = useResources();
  const urlUpdate = React.useMemo(
    () => getEndpoint("permissions", permissions.idPermissions ?? ""),
    [getEndpoint, permissions.idPermissions],
  );
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingData, setPendingData] =
    React.useState<PermissionsUpdate | null>(null);

  const { status, mensagem, erro, errors } = serverState;

  React.useEffect(() => {
    if (status === 0) return;

    if (status >= 400) {
      toast.error("Erro", { description: erro || mensagem });
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof PermissionsUpdate, {
            type: "server",
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success("Sucesso!", { description: mensagem });
    }
  }, [status, mensagem, errors, erro, form]);

  function onSubmit(permissionsUpdate: PermissionsUpdate) {
    try {
      const validatedData = getPermissionsSchema(dict).parse(permissionsUpdate);
      setPendingData(validatedData);
      setShowConfirmDialog(true);
    } catch (error) {
      console.error("Validação falhou", error);
    }
  }

  function handleConfirm() {
    if (!idPermissions) return toast.error(dict.roles.management.id_not_found);
    if (!urlUpdate) return toast.error(dict.app.endpoint.api_resources);
    if (!pendingData) return;

    startTransition(async () => {
      try {
        serverAction({
          id: idPermissions,
          permissionsUpdate: pendingData,
          url: urlUpdate,
        });
      } finally {
        setShowConfirmDialog(false);
        setPendingData(null); // Limpa o estado após o uso
      }
    });
  }

  const rolesPickerData = roles.map((role) => ({
    ...role,
    id: role.idRoles,
  }));

  const resourcesPickerData = resources.map((resource) => ({
    ...resource,
    id: resource.idResources,
  }));
  return (
    <>
      <FormContainer
        title={dict.permissions.form.edit_title}
        description={dict.permissions.form.edit_description}
        state={serverState}
        isPending={isPending}
        formId="form-roles"
        onSubmit={form.handleSubmit(onSubmit)}
        action={dict.permissions.form.action}
        confirm={dict.permissions.form.confirm}
        href="/dashboard/permissions"
        cancel={dict.permissions.form.cancel}
        ariaLabelCon={dict.permissions.management.action_new}
        ariaLabelCancel={dict.permissions.management.action_cancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12 space-y-6">
            <FieldGroup>
              {/* ROLE ID */}
              <Controller
                name="roleId"
                control={form.control}
                render={({ field, fieldState }) => {
                  const selectedIds = field.value ? [String(field.value)] : [];

                  const handleSelectionChange = (ids: string[]) => {
                    const lastSelected = ids[ids.length - 1];
                    field.onChange(lastSelected ? Number(lastSelected) : 0);
                  };

                  const selectedRole = roles.find(
                    (r) => r.idRoles === field.value,
                  );

                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        {dict.permissions.form.label.roleId}:
                      </FieldLabel>

                      <div className="flex items-center gap-4">
                        <UniversalPicker
                          title={dict.permissions.management.description}
                          data={rolesPickerData}
                          columns={roleColumns}
                          selectedIds={selectedIds}
                          onSelectionChange={handleSelectionChange}
                        />
                        {selectedRole && (
                          <span className="text-sm font-medium text-muted-foreground">
                            <b className="text-foreground">
                              {selectedRole.nomeRoles}
                            </b>
                          </span>
                        )}
                      </div>

                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  );
                }}
              />

              {/* RESOURCE ID */}
              <Controller
                name="resourceId"
                control={form.control}
                render={({ field, fieldState }) => {
                  const selectedIds = field.value ? [String(field.value)] : [];

                  const handleSelectionChange = (ids: string[]) => {
                    const lastSelected = ids[ids.length - 1];
                    field.onChange(lastSelected ? Number(lastSelected) : 0);
                  };

                  const selectedResource = resources.find(
                    (r) => r.idResources === field.value,
                  );

                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        {dict.permissions.form.label.resourceId}:
                      </FieldLabel>

                      <div className="flex items-center gap-4">
                        <UniversalPicker
                          title={dict.permissions.management.description}
                          data={resourcesPickerData}
                          columns={resourcesColumns}
                          selectedIds={selectedIds}
                          onSelectionChange={handleSelectionChange}
                        />
                        {selectedResource && (
                          <span className="text-sm font-medium text-muted-foreground">
                            <b className="text-foreground">
                              {selectedResource.nomeResources}
                            </b>
                          </span>
                        )}
                      </div>

                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  );
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
                {/* SELECT ACTION */}
                <Controller
                  name="action"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        {dict.permissions.form.label.action}:
                      </FieldLabel>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma ação" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          sideOffset={4}
                          side="bottom"
                          className="w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-y-auto"
                        >
                          {Object.values(Action).map((actionValue) => (
                            <SelectItem key={actionValue} value={actionValue}>
                              {dict.permissions.management.enums.action?.[
                                actionValue
                              ] || actionValue}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                {/* POSSESSION */}
                <Controller
                  name="possession"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        {dict.permissions.form.label.possession}:
                      </FieldLabel>
                      <Select
                        {...field}
                        disabled={isPending}
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma posse" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          sideOffset={4}
                          side="bottom"
                          className="w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-y-auto"
                        >
                          {Object.values(Possession).map((possessionValue) => (
                            <SelectItem
                              key={possessionValue}
                              value={possessionValue}
                            >
                              {dict.permissions.management.enums.possession?.[
                                possessionValue
                              ] || possessionValue}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </div>
        </div>
      </FormContainer>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dict.roles.form.confirm_title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dict.roles.form.confirm_description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingData(null)}>
              {dict.roles.form.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {dict.roles.form.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
