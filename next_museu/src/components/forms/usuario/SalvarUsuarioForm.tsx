'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { salvarUsuarioAction } from '../../../actions/usuario/salvar-usuario-actions';
import {
  getUsuarioCreateFormSchema,
  UsuarioCreateForm,
  UsuarioResponse,
} from '../../../schemas/usuario-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { useResources } from '../../../service/providers/resource-providers';
import { ApiResponse } from '../../../type/api';
import { UploadAvatar } from '../../shared/crop/upload-avatar';
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';
import { FormContainer } from '../form-layout';

const initialState: ApiResponse<UsuarioResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

export default function SalvarUsuarioForm() {
  const [serverState, action, isPending] = useActionState(
    salvarUsuarioAction,
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
  const urlCreate = getEndpoint('usuario');

  const form = useForm<UsuarioCreateForm>({
    resolver: zodResolver(getUsuarioCreateFormSchema(dict)),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      imagePath: '',
      password: '',
      confirmPassword: '',
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
          form.setError(field as keyof UsuarioCreateForm, {
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

  function onSubmit(data: UsuarioCreateForm) {
    if (!urlCreate) {
      return toast.error(dict.app.endpoint.api_resources);
    }

    React.startTransition(async () => {
      action({
        usuarioCreate: data,
        url: urlCreate,
      });
    });
  }

  React.useEffect(() => {
    form.register('imagePath');
  }, [form]);

  return (
    <FormContainer
      title={dict.usuario.form.create_title}
      description={dict.usuario.form.create_description}
      state={localState}
      isPending={isPending}
      formId="form-usuario"
      onSubmit={form.handleSubmit(onSubmit)}
      action={dict.usuario.form.action}
      confirm={dict.usuario.form.confirm}
      href="/dashboard/usuario"
      cancel={dict.usuario.form.cancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-6">
          <FieldGroup>
            {/* Primeiro Nome */}
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.usuario.form.label.firstName}:</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={dict.usuario.form.label.placeHolderFirstName}
                    autoComplete="off"
                  />
                  {fieldState.invalid && fieldState.error && (
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
                    value={field.value ?? ''}
                    placeholder={dict.usuario.form.label.placeHolderLastName}
                    autoComplete="off"
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Nome */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.usuario.form.label.name}:</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={dict.usuario.form.label.placeHolderName}
                    autoComplete="off"
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.usuario.form.label.email}:</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="email"
                    placeholder={dict.usuario.form.label.placeHolderEmail}
                    autoComplete="off"
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Senha */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.usuario.form.label.password}:</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="password"
                    placeholder="******"
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* ConfirmSenha */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    {dict.usuario.form.label.confirmPassword}:
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="password"
                    placeholder="******"
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <div className="md:col-span-4 flex flex-col items-center justify-start space-y-4">
          <UploadAvatar
            type="usuarios"
            onChange={(url) => form.setValue('imagePath', url ?? '')}
          />
        </div>
      </div>
    </FormContainer>
  );
}
