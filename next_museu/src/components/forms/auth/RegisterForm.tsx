'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

import { ButtonLoading } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SeparatorWithText } from '@/components/ui/separator';

import { useRouter } from 'next/navigation';
import React, { startTransition, useActionState } from 'react';
import { toast } from 'sonner';
import { registerAuthAction } from '../../../actions/auth/register-auth-actions';
import {
    getRegisterSchema,
    RegisterCreate,
    RegisterResponse,
} from '../../../schemas/register-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { useResources } from '../../../service/providers/resource-providers';
import { ApiResponse } from '../../../type/api';
import { Field, FieldError, FieldLabel } from '../../ui/field';
import { OAuthLinks } from './oauth-links';

const initialState: ApiResponse<RegisterResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

export function RegisterForm() {
  const [state, action, isPending] = useActionState(
    registerAuthAction,
    initialState,
  );
  const dict = useDictionary();
  const router = useRouter();
  const form = useForm<RegisterCreate>({
    resolver: zodResolver(getRegisterSchema(dict)),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { status, mensagem, erro, errors } = state;
  const { resources, loading } = useResources();
  const urlRegister = React.useMemo(() => {
    if (loading) return '';
    const resource = resources.find(
      (r) =>
        r.name.toLowerCase() === 'credentials' &&
        r.method.includes('POST') &&
        r.endpoint.includes('register'),
    );

    return resource?.endpoint || '';
  }, [resources, loading]);

  React.useEffect(() => {
    if (status === 0) return;

    if (status >= 400) {
      toast.error(mensagem);
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof RegisterCreate, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success(mensagem);
    }
  }, [status, mensagem, errors, erro, form]);

  React.useEffect(() => {
    if (state.status === 200 || state.status === 201) {
      toast.success(dict.auth.register.description);
      router.push('/login');
      router.refresh();
    } else if (state.erro || state.mensagem) {
      toast.error(state.erro || state.mensagem);
    }
  }, [state, router]);

  const onSubmit = form.handleSubmit((data: RegisterCreate) => {
    if (!urlRegister) {
      return toast.error('Configuração de API não encontrada');
    }
    startTransition(() => {
      action({
        registerRequest: data,
        url: urlRegister,
      });
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{dict.auth.register.firstName}</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder={dict.auth.register.placeholderFirstName}
                autoComplete="off"
              />
              {fieldState.invalid && fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{dict.auth.register.lastName}</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder={dict.auth.register.placeholderLastName}
                autoComplete="off"
              />
              {fieldState.invalid && fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <div className="sm:col-span-2">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>{dict.auth.register.username}</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder={dict.auth.register.placeholderUserName}
                  autoComplete="off"
                />
                {fieldState.invalid && fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        </div>

        <div className="sm:col-span-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>{dict.auth.register.email}</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder={dict.auth.register.placeholderEmail}
                  autoComplete="off"
                />
                {fieldState.invalid && fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{dict.auth.register.password}</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ''}
                type="password"
                placeholder={dict.auth.register.placeholderPassword}
              />
              {fieldState.invalid && fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{dict.auth.register.confirmPassword}</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ''}
                type="password"
                placeholder={dict.auth.register.placeholderConfirmPassword}
              />
              {fieldState.invalid && fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
      </div>

      <ButtonLoading isLoading={isPending} disabled={isPending}>
        {dict.auth.access}
      </ButtonLoading>
      <div className="-mt-4 text-center text-sm">
        {dict.auth.alreadyHaveAccount}{' '}
        <Link href="/sign-in" className="underline">
          {dict.auth.signIn}
        </Link>
      </div>
      <SeparatorWithText>{dict.auth.orContinueWith}</SeparatorWithText>
      <OAuthLinks />
    </form>
  );
}
