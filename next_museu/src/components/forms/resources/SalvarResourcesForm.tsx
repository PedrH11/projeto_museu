'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { salvarResourcesAction } from '../../../actions/resources/salvar-resources-actions';
import {
  getResourcesSchema,
  ResourcesCreate,
  ResourcesResponse,
} from '../../../schemas/resources-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { useResources } from '../../../service/providers/resource-providers';
import { ApiResponse } from '../../../type/api';
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';
import { FormContainer } from '../form-layout';

const initialState: ApiResponse<ResourcesResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

export default function SalvarResourcesForm() {
  const [serverState, action, isPending] = useActionState(
    salvarResourcesAction,
    initialState,
  );

  const dict = useDictionary();
  const { getEndpoint } = useResources();
  const urlCreate = getEndpoint('resources');

  const form = useForm<ResourcesCreate>({
    resolver: zodResolver(getResourcesSchema(dict)),
    defaultValues: {
      nomeResources: '',
    },
  });

  const { status, mensagem, erro, errors } = serverState;

  React.useEffect(() => {
    if (status === 0 || (!mensagem && !erro)) return;

    if (status >= 400) {
      toast.error('Erro', { description: erro || mensagem });
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof ResourcesCreate, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success(mensagem);
    }
  }, [status, mensagem, errors, erro, form]);

  function onSubmit(data: ResourcesCreate) {
    if (!urlCreate) {
      return toast.error(dict.app.endpoint.api_resources);
    }

    React.startTransition(async () => {
      action({
        resourcesCreate: data,
        url: urlCreate,
      });
    });
  }

  return (
    <FormContainer
      title={dict.resources.form.create_title}
      description={dict.resources.form.create_description}
      state={serverState}
      isPending={isPending}
      formId="form-resources"
      onSubmit={form.handleSubmit(onSubmit)}
      action={dict.resources.form.action}
      confirm={dict.resources.form.confirm}
      href="/dashboard/resources"
      cancel={dict.resources.form.cancel}
      ariaLabelCon={dict.resources.management.action_new}
      ariaLabelCancel={dict.resources.management.action_cancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-6">
          <FieldGroup>
            {/* Primeiro Nome */}
            <Controller
              name="nomeResources"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    {dict.resources.form.label.nameResources}:
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={
                      dict.resources.form.label.placeHolderNameResources
                    }
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
