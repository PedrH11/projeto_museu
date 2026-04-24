'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition, useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { atualizarRolesAction } from '../../../actions/roles/atualizar-roles-actions';
import {
  getRolesSchema,
  RolesResponse,
  RolesUpdate,
} from '../../../schemas/roles-schemas';
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

const initialState: ApiResponse<RolesResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

type RolesResponseProps = RolesResponse;

export default function AtualizarRolesForm({
  roles,
  idRoles,
}: {
  roles: RolesResponseProps;
  idRoles: string;
}) {
  const [serverState, serverAction, isPending] = useActionState(
    atualizarRolesAction,
    initialState,
  );

  const [localState, setLocalState] = React.useState(initialState);

  React.useEffect(() => {
    if (serverState.status !== 0) {
      setLocalState(serverState);
    }
  }, [serverState]);

  const dict = useDictionary();
  const form = useForm<RolesUpdate>({
    resolver: zodResolver(getRolesSchema(dict)),
    defaultValues: {
      idRoles: roles.idRoles,
      nameRoles: roles.nameRoles,
    },
  });

  const { getEndpoint } = useResources();
  const urlUpdate = React.useMemo(
    () => getEndpoint('roles', roles.idRoles ?? ''),
    [getEndpoint, roles.idRoles],
  );
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingData, setPendingData] = React.useState<RolesUpdate | null>(
    null,
  );

  React.useEffect(() => {
    if (serverState.status !== 0) {
      setLocalState(serverState);
    }
  }, [serverState]);

  const resetLocalState = React.useCallback(() => {
    setLocalState(initialState);
  }, []);

  const { status, mensagem, erro, errors } = localState;

  React.useEffect(() => {
    if (status === 0) return;

    if (status >= 400) {
      toast.error('Erro', { description: erro || mensagem });
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof RolesUpdate, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success('Sucesso!', { description: mensagem });
    }

    resetLocalState();
  }, [status, mensagem, errors, erro, form, resetLocalState]);

  function onSubmit(rolesUpdate: RolesUpdate) {
    try {
      const validatedData = getRolesSchema(dict).parse(rolesUpdate);
      setPendingData(validatedData);
      setShowConfirmDialog(true);
    } catch (error) {
      console.error('Validação falhou', error);
    }
  }

  function handleConfirm() {
    if (!idRoles) return toast.error(dict.roles.management.id_not_found);
    if (!urlUpdate) return toast.error(dict.app.endpoint.api_resources);
    if (!pendingData) return;

    startTransition(async () => {
      try {
        serverAction({
          id: idRoles,
          rolesUpdate: pendingData,
          url: urlUpdate,
        });
      } finally {
        setShowConfirmDialog(false);
        setPendingData(null); // Limpa o estado após o uso
      }
    });
  }

  return (
    <>
      <FormContainer
        title={dict.roles.form.edit_title}
        description={dict.roles.form.edit_description}
        state={localState}
        isPending={isPending}
        formId="form-roles"
        onSubmit={form.handleSubmit(onSubmit)}
        action={dict.roles.form.action}
        confirm={dict.roles.form.confirm}
        href="/dashboard/roles"
        cancel={dict.roles.form.cancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-6">
            <FieldGroup>
              {/* Nome */}
              <Controller
                name="nameRoles"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{dict.roles.form.label.nameRole}:</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder={dict.roles.form.label.placeHolderNameRole}
                      autoComplete="off"
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
