'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  getUsuarioUpdateSchema,
  UsuarioConsultar,
  UsuarioResponse,
} from '../../../schemas/usuario-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { UploadAvatar } from '../../shared/crop/upload-avatar';
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';
import { FormContainer } from '../form-layout';

type UsuarioResponseProps = UsuarioResponse;

export default function ConsultarUsuarioForm({
  usuario,
}: {
  usuario: UsuarioResponseProps;
}) {
  const dict = useDictionary();
  const form = useForm<UsuarioConsultar>({
    resolver: zodResolver(getUsuarioUpdateSchema(dict)),
    defaultValues: {
      idUsuario: usuario.idUsuario,
      username: usuario.username,
      email: usuario.email,
      imagePath: usuario.imagePath ?? '',
    },
  });

  return (
    <FormContainer
      title={dict.usuario.form.consult_title}
      description={dict.usuario.form.consult_description}
      formId="form-usuario"
      href="/dashboard/usuario"
      cancel={dict.usuario.form.cancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-6">
          <FieldGroup>
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
                    autoComplete="off"
                    readOnly
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
