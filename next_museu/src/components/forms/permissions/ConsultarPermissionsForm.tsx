"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  getPermissionsSchema,
  PermissionsConsultar,
  PermissionsResponse,
} from "../../../schemas/permissions-schemas";
import { useDictionary } from "../../../service/providers/i18n-providers";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { FormContainer } from "../form-layout";

export default function ConsultarPermissionsForm({
  permissions,
}: {
  permissions: PermissionsResponse;
}) {
  //console.log(JSON.stringify(permissions));
  const dict = useDictionary();
  const form = useForm<PermissionsConsultar>({
    resolver: zodResolver(getPermissionsSchema(dict)),
    values: {
      idPermissions: permissions.idPermissions,
      roleId: permissions.role?.idRoles ?? 0,
      nomeRoles: permissions.role?.nomeRoles ?? "",
      resourceId: permissions.resource?.idResources ?? "",
      nomeResources: permissions.resource?.nomeResources ?? "",
      action: permissions.action,
      possession: permissions.possession,
    },
  });

  return (
    <FormContainer
      title={dict.permissions.form.consult_title}
      description={dict.permissions.form.consult_description}
      formId="form-permissions"
      href="/dashboard/permissions"
      cancel={dict.permissions.form.cancel}
      ariaLabelCon={dict.permissions.management.action_delete}
      ariaLabelCancel={dict.permissions.management.action_cancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-6">
          <FieldGroup>
            <Controller
              name="nomeRoles"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    {dict.permissions.form.label.roleName}:
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    autoComplete="off"
                    readOnly
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="nomeResources"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    {dict.permissions.form.label.resourcesName}
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="text"
                    autoComplete="off"
                    readOnly
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="action"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.permissions.form.label.action}:</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="text"
                    autoComplete="off"
                    readOnly
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="possession"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    {dict.permissions.form.label.possession}:
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="text"
                    autoComplete="off"
                    readOnly
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      </div>
    </FormContainer>
  );
}
