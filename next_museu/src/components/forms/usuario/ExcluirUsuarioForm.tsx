'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition, useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { excluirUsuarioAction } from '../../../actions/usuario/excluir-usuario-actions';
import {
  getUsuarioUpdateSchema,
  UsuarioDelete,
  UsuarioResponse,
  UsuarioUpdate,
} from '../../../schemas/usuario-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { useResources } from '../../../service/providers/resource-providers';
import { ApiResponse } from '../../../type/api';
import { UploadAvatar } from '../../shared/crop/upload-avatar';
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

const initialState: ApiResponse<UsuarioResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

type UsuarioResponseProps = UsuarioResponse;

export default function ExcluirUsuarioForm({
  idUsuario,
  usuario,
}: {
  idUsuario: string;
  usuario: UsuarioResponseProps;
}) {
  const [state, action, isPending] = useActionState(
    excluirUsuarioAction,
    initialState,
  );
  const dict = useDictionary();
  const form = useForm<UsuarioDelete>({
    resolver: zodResolver(getUsuarioUpdateSchema(dict)),
    defaultValues: {
      idUsuario: usuario.idUsuario,
      username: usuario.username,
      email: usuario.email,
      imagePath: usuario.imagePath ?? '',
    },
  });

  const { getEndpoint } = useResources();
  const urlDelete = React.useMemo(
    () => getEndpoint('usuario', usuario.idUsuario ?? ''),
    [getEndpoint, usuario.idUsuario],
  );

  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingData, setPendingData] = React.useState<UsuarioDelete | null>(
    null,
  );

  const { status, mensagem, erro, errors } = state;

  React.useEffect(() => {
    if (status === 0) return;

    if (status >= 400) {
      toast.error('Erro', { description: erro || mensagem });
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof UsuarioUpdate, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success('Sucesso!', { description: mensagem });
    }
  }, [status, mensagem, errors, erro, form]);

  function onSubmit(usuarioDelete: UsuarioDelete) {
    if (idUsuario === undefined || idUsuario === null) {
      return toast.error(dict.usuario.management.id_not_found);
    }
    setPendingData(usuarioDelete);
    setShowConfirmDialog(true);
  }

  function handleConfirm() {
    if (!urlDelete) return toast.error(dict.app.endpoint.api_resources);
    if (pendingData) {
      startTransition(() => {
        action({ id: Number(idUsuario), url: urlDelete });
      });
    }
    setShowConfirmDialog(false);
  }

  React.useEffect(() => {
    form.register('imagePath');
  }, [form]);

  return (
    <>
      <FormContainer
        title={dict.usuario.form.delete_title}
        description={dict.usuario.form.delete_description}
        state={state}
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
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dict.usuario.form.confirm_title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dict.usuario.form.confirm_description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingData(null)}>
              {dict.usuario.form.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {dict.usuario.form.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
