'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { salvarRolesAction } from '../../../actions/roles/salvar-roles-actions';
import {
  RolesCreate,
  RolesResponse,
  getRolesSchema,
} from '../../../schemas/roles-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { useResources } from '../../../service/providers/resource-providers';
import { ApiResponse } from '../../../type/api';
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

export default function SalvarRolesForm() {
  const [serverState, action, isPending] = useActionState(
    salvarRolesAction,
    initialState,
  );

  const [localState, setLocalState] = React.useState(initialState);

  const resetLocalState = React.useCallback(() => {
    setLocalState(initialState);
  }, []);

  React.useEffect(() => {
    if (serverState.status !== 0) {
      setLocalState(serverState);
    }
  }, [serverState]);

  const dict = useDictionary();
  const { getEndpoint } = useResources();
  const urlCreate = getEndpoint('roles');

  const form = useForm<RolesCreate>({
    resolver: zodResolver(getRolesSchema(dict)),
    defaultValues: {
      nameRole: '',
    },
  });

  React.useEffect(() => {
    const { status, mensagem, erro, errors } = localState;

    if (status === 0) return;

    if (status >= 400) {
      toast.error('Erro', {
        description: erro || mensagem,
      });

      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof RolesCreate, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success('Sucesso!', { description: mensagem });
      form.reset();
    }

    resetLocalState();
  }, [localState, form, resetLocalState]);

  function onSubmit(data: RolesCreate) {
    if (!urlCreate) {
      return toast.error(dict.app.endpoint.api_resources);
    }

    React.startTransition(async () => {
      action({
        rolesCreate: data, url: urlCreate,
      });
    });
  }

  return (
    <FormContainer
      title={dict.roles.form.create_title}
      description={dict.roles.form.create_description}
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
            {/* Primeiro Nome */}
            <Controller
              name="nameRole"
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
        </div>

      </div>
    </FormContainer>
  );
}
