'use client';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { startTransition, useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { loginAuthAction } from '../../../actions/auth/login-auth-actions';
import {
  getLoginSchema,
  LoginRequest,
  LoginResponse,
} from '../../../schemas/sigin-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { useResources } from '../../../service/providers/resource-providers';
import { ApiResponse } from '../../../type/api';
import { ButtonLoading } from '../../ui/button';
import { Field, FieldError, FieldGroup } from '../../ui/field';
import { SeparatorWithText } from '../../ui/separator';
import { OAuthLinks } from './oauth-links';

const initialState: ApiResponse<LoginResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

export function SignInForm() {
  const [state, action, isPending] = useActionState(
    loginAuthAction,
    initialState,
  );
  const dict = useDictionary();
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(getLoginSchema(dict)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { status, mensagem, erro, errors } = state;
  const { resources, loading } = useResources();
  const urlLogin = React.useMemo(() => {
    if (loading) return '';
    const resource = resources.find(
      (r) =>
        r.name.toLowerCase() === 'credentials' && r.method.includes('POST'),
    );

    return resource?.endpoint || '';
  }, [resources, loading]);

  React.useEffect(() => {
    if (status === 0) return;

    if (status >= 400) {
      toast.error(mensagem);
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof LoginRequest, {
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
      toast.success(dict.auth.login.signIn);
      router.push('/dashboard');
      router.refresh();
    } else if (state.erro || state.mensagem) {
      toast.error(state.erro || state.mensagem);
    }
  }, [state, router]);

  const onSubmit = form.handleSubmit((data) => {
    if (!urlLogin) {
      return toast.error(dict.app.endpoint.api_resources);
    }
    startTransition(() => {
      action({
        loginRequest: data,
        url: urlLogin,
      });
    });
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-6 w-full">
      <div className="grid w-full gap-2 text-left">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {/* <FieldLabel>{dict.auth.login.email}:</FieldLabel> */}
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder={dict.auth.login.email}
                  autoComplete="off"
                />
                {fieldState.invalid && fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center">
                  {/* <FieldLabel>{dict.auth.login.password}:</FieldLabel> */}
                  <Link
                    href="/forgot-password"
                    className="ms-auto inline-block text-sm underline"
                  >
                    {dict.auth.login.forgotPassword}
                  </Link>
                </div>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  type="password"
                  placeholder={dict.auth.login.placeholderSenha} // Opcional: adicionar ao JSON
                  autoComplete="current-password"
                />
                {fieldState.invalid && fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      <ButtonLoading
        isLoading={isPending}
        disabled={isPending}
        aria-label={dict.auth.signIn}
      >
        {dict.auth.signIn}
      </ButtonLoading>
      <div className="-mt-4 text-center text-sm">
        {dict.auth.dontHaveAccount}{' '}
        <Link
          href="/register"
          className="underline"
          aria-label={dict.auth.signUp}
        >
          {dict.auth.signUp}
        </Link>
      </div>
      <SeparatorWithText>{dict.auth.orContinueWith}</SeparatorWithText>
      <OAuthLinks />
    </form>
  );
}
