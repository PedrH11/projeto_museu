'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition, useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { excluirPermissionsAction } from '../../../actions/permissions/excluir-permissions-actions';
import { getPermissionsSchema, PermissionsDelete, PermissionsResponse } from '../../../schemas/permissions-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { useResources } from '../../../service/providers/resource-providers';
import { ApiResponse } from '../../../type/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';
import { FormContainer } from '../form-layout';

const initialState: ApiResponse<PermissionsResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

type PermissionsResponseProps = PermissionsResponse;

export default function ExcluirPermissionsForm({
  idPermissions,
  permissions
}: {
  idPermissions: string;
  permissions: PermissionsResponseProps;
}) {
  const [state, action, isPending] = useActionState(
    excluirPermissionsAction,
    initialState,
  );
  const dict = useDictionary();
  const form = useForm<PermissionsDelete>({
    resolver: zodResolver(getPermissionsSchema(dict)),
    values: {
      idPermissions: permissions.idPermissions,
      roleId: permissions.role?.idRoles ?? 0,
      nomeRoles: permissions.role?.nomeRoles ?? '',
      resourceId: permissions.resource?.idResources ?? '',
      nomeResources: permissions.resource?.nomeResources ?? '',
      action: permissions.action,
      possession: permissions.possession,
    },
  });

  const { getEndpoint } = useResources();
  const urlDelete = React.useMemo(
    () => getEndpoint('permissions', permissions.idPermissions ?? ''),
    [getEndpoint, permissions.idPermissions],
  );

  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingData, setPendingData] = React.useState<PermissionsDelete | null>(
    null,
  );

  const { status, mensagem, erro, errors } = state;

  React.useEffect(() => {
    if (status === 0) return;

    if (status >= 400) {
      toast.error('Erro', { description: erro || mensagem });
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof PermissionsDelete, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success('Sucesso!', { description: mensagem });
    }
  }, [status, mensagem, errors, erro, form]);

  function onSubmit(permissionsDelete: PermissionsDelete) {
    if (idPermissions === undefined || idPermissions === null) {
      return toast.error(dict.permissions.management.id_not_found);
    }
    setPendingData(permissionsDelete);
    setShowConfirmDialog(true);
  }

  function handleConfirm() {
    if (!urlDelete) return toast.error(dict.app.endpoint.api_resources);
    if (pendingData) {
      startTransition(() => {
        action({ id: Number(idPermissions), url: urlDelete });
      });
    }
    setShowConfirmDialog(false);
  }

  return (
    <>
      <FormContainer
        title={dict.permissions.form.delete_title}
        description={dict.permissions.form.delete_description}
        state={state}
        isPending={isPending}
        formId="form-permissions"
        onSubmit={form.handleSubmit(onSubmit)}
        action={dict.permissions.form.action}
        confirm={dict.permissions.form.confirm}
        href="/dashboard/permissions"
        cancel={dict.permissions.form.cancel}
        ariaLabelCon={dict.permissions.management.action_delete}
        ariaLabelCancel={dict.permissions.management.action_cancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-6">
            <FieldGroup>
              {/* Nome */}
              <Controller
                 name="nomeRoles"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{dict.permissions.form.label.roleName}:</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ''}
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
                    value={field.value ?? ''}
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
                    value={field.value ?? ''}
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
                    value={field.value ?? ''}
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
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dict.permissions.form.confirm_title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dict.permissions.form.confirm_description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingData(null)}>
              {dict.permissions.form.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {dict.permissions.form.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
