'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition, useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { atualizarUsuarioAction } from '../../../actions/usuario/atualizar-usuario-actions';
import {
  getUsuarioUpdateSchema,
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

export default function AtualizarUsuarioForm({
  usuario,
  idUsuario,
}: {
  usuario: UsuarioResponseProps;
  idUsuario: string;
}) {
  const [serverState, serverAction, isPending] = useActionState(
    atualizarUsuarioAction,
    initialState,
  );

  const [localState, setLocalState] = React.useState(initialState);

  React.useEffect(() => {
    if (serverState.status !== 0) {
      setLocalState(serverState);
    }
  }, [serverState]);

  const dict = useDictionary();
  const form = useForm<UsuarioUpdate>({
    resolver: zodResolver(getUsuarioUpdateSchema(dict)),
    defaultValues: {
      idUsuario: usuario.idUsuario,
      username: usuario.username,
      email: usuario.email,
      imagePath: usuario.imagePath ?? '',
    },
  });

  const { getEndpoint } = useResources();
  const urlUpdate = React.useMemo(
    () => getEndpoint('usuario', usuario.idUsuario ?? ''),
    [getEndpoint, usuario.idUsuario],
  );
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingData, setPendingData] = React.useState<UsuarioUpdate | null>(
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
          form.setError(field as keyof UsuarioUpdate, {
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

  function onSubmit(usuarioUpdate: UsuarioUpdate) {
    try {
      const validatedData = getUsuarioUpdateSchema(dict).parse(usuarioUpdate);
      setPendingData(validatedData);
      setShowConfirmDialog(true);
    } catch (error) {
      console.error('Validação falhou', error);
    }
  }

  function handleConfirm() {
    if (!idUsuario) return toast.error(dict.usuario.management.id_not_found);
    if (!urlUpdate) return toast.error(dict.app.endpoint.api_resources);
    if (!pendingData) return;

    startTransition(async () => {
      try {
        serverAction({
          id: idUsuario,
          usuarioUpdate: pendingData,
          url: urlUpdate,
        });
      } finally {
        setShowConfirmDialog(false);
        setPendingData(null); // Limpa o estado após o uso
      }
    });
  }

  React.useEffect(() => {
    form.register('imagePath');
  }, [form]);

  return (
    <>
      <FormContainer
        title={dict.usuario.form.edit_title}
        description={dict.usuario.form.edit_description}
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
