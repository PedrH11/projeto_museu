"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { salvarPermissionsAction } from "../../../actions/permissions/salvar-permissions-actions";
import { Action } from "../../../lib/action.enum";
import { Possession } from "../../../lib/possession.enum";
import { UniversalPicker } from "../../../lib/universal-picker";
import {
  getPermissionsSchema,
  PermissionsCreate,
  PermissionsResponse,
} from "../../../schemas/permissions-schemas";
import { ResourcesResponse } from "../../../schemas/resources-schemas";
import { RolesResponse } from "../../../schemas/roles-schemas";
import { useDictionary } from "../../../service/providers/i18n-providers";
import { useResources } from "../../../service/providers/resource-providers";
import { ApiResponse } from "../../../type/api";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
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

interface SalvarPermissionsFormProps {
  roles: RolesResponse[];
  resources: ResourcesResponse[];
}

export default function SalvarPermissionsForm({
  roles,
  resources,
}: SalvarPermissionsFormProps) {
  const dict = useDictionary();
  const { getEndpoint } = useResources();
  const urlCreate = getEndpoint("permissions");
  const roleColumns = getRoleColumns(dict);
  const resourcesColumns = getResourcesColumns(dict);

  const [state, action, isPending] = useActionState(
    salvarPermissionsAction,
    initialState,
  );

  const form = useForm<PermissionsCreate>({
    resolver: zodResolver(getPermissionsSchema(dict)),
    defaultValues: {
      roleId: 0,
      resourceId: 0,
      action: Action.READ,
      possession: Possession.ANY,
    },
  });

  useEffect(() => {
    if (state.status === 0) return;

    if (state.status >= 400) {
      toast.error("Erro", { description: state.erro || state.mensagem });
      if (state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          form.setError(field as keyof PermissionsCreate, {
            type: "server",
            message: (messages as string[])?.[0],
          });
        });
      }
    } else if (state.status >= 200 && state.status < 300) {
      toast.success("Sucesso!", { description: state.mensagem });
      form.reset();
    }
  }, [state, form]);

  const onSubmit = (data: PermissionsCreate) => {
    if (!urlCreate) return toast.error(dict.app.endpoint.api_resources);

    action({
      permissionsCreate: data,
      url: urlCreate,
    });
  };

  const rolesPickerData = roles.map((role) => ({
    ...role,
    id: role.idRoles,
  }));

  const resourcesPickerData = resources.map((resource) => ({
    ...resource,
    id: resource.idResources,
  }));

  return (
    <FormContainer
      title={dict.permissions.form.create_title}
      description={dict.permissions.form.create_description}
      state={state}
      isPending={isPending}
      formId="form-permissions"
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
                          {dict.permissions.form.label.resourceId}:{" "}
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
  );
}
