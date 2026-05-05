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

  const dict = useDictionary();
  const { getEndpoint } = useResources();
  const urlCreate = getEndpoint('roles');

  const form = useForm<RolesCreate>({
    resolver: zodResolver(getRolesSchema(dict)),
    defaultValues: {
      nomeRoles: '',
    },
  });

  const { status, mensagem, erro, errors } = serverState;

  React.useEffect(() => {
    if (status === 0 || (!mensagem && !erro)) return;

    if (status >= 400) {
      toast.error('Erro', { description: erro || mensagem });
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof RolesCreate, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success(mensagem);
    }
  }, [status, mensagem, errors, erro, form]);

  function onSubmit(data: RolesCreate) {
    if (!urlCreate) {
      return toast.error(dict.app.endpoint.api_resources);
    }

    React.startTransition(async () => {
      action({
        rolesCreate: data,
        url: urlCreate,
      });
    });
  }

  return (
    <FormContainer
      title={dict.roles.form.create_title}
      description={dict.roles.form.create_description}
      state={serverState}
      isPending={isPending}
      formId="form-roles"
      onSubmit={form.handleSubmit(onSubmit)}
      action={dict.roles.form.action}
      confirm={dict.roles.form.confirm}
      href="/dashboard/roles"
      cancel={dict.roles.form.cancel}
      ariaLabelCon={dict.roles.management.action_new}
      ariaLabelCancel={dict.roles.management.action_cancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-6">
          <FieldGroup>
            {/* Primeiro Nome */}
            <Controller
              name="nomeRoles"
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
  );
}
