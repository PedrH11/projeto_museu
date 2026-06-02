'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition, useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { excluirResourcesAction } from '../../../actions/resources/excluir-resources-actions';
import {
  getResourcesSchema,
  ResourcesDelete,
  ResourcesResponse,
  ResourcesUpdate,
} from '../../../schemas/resources-schemas';
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

const initialState: ApiResponse<ResourcesResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

type ResourcesResponseProps = ResourcesResponse;

export default function ExcluirResourcesForm({
  idResources,
  resources,
}: {
  idResources: string;
  resources: ResourcesResponseProps;
}) {
  const [state, action, isPending] = useActionState(
    excluirResourcesAction,
    initialState,
  );
  const dict = useDictionary();
  const form = useForm<ResourcesDelete>({
    resolver: zodResolver(getResourcesSchema(dict)),
    defaultValues: {
      idResources: resources.idResources,
      nomeResources: resources.nomeResources,
    },
  });

  const { getEndpoint } = useResources();
  const urlDelete = React.useMemo(
    () => getEndpoint('resources', resources.idResources ?? ''),
    [getEndpoint, resources.idResources],
  );

  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingData, setPendingData] = React.useState<ResourcesDelete | null>(
    null,
  );

  const { status, mensagem, erro, errors } = state;

  React.useEffect(() => {
    if (status === 0 || (!mensagem && !erro)) return;

    if (status >= 400) {
      toast.error(erro || mensagem);
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          form.setError(field as keyof ResourcesUpdate, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success(mensagem);
    }
  }, [status, mensagem, errors, erro, form]);

  function onSubmit(resourcesDelete: ResourcesDelete) {
    if (idResources === undefined || idResources === null) {
      return toast.error(dict.resources.management.id_not_found);
    }
    setPendingData(resourcesDelete);
    setShowConfirmDialog(true);
  }

  function handleConfirm() {
    if (!urlDelete) return toast.error(dict.app.endpoint.api_resources);
    if (pendingData) {
      startTransition(() => {
        action({ id: Number(idResources), url: urlDelete });
      });
    }
    setShowConfirmDialog(false);
  }

  return (
    <>
      <FormContainer
        title={dict.resources.form.delete_title}
        description={dict.resources.form.delete_description}
        state={state}
        isPending={isPending}
        formId="form-resources"
        onSubmit={form.handleSubmit(onSubmit)}
        action={dict.resources.form.action}
        confirm={dict.resources.form.confirm}
        href="/dashboard/resources"
        cancel={dict.resources.form.cancel}
        ariaLabelCon={dict.resources.management.action_delete}
        ariaLabelCancel={dict.resources.management.action_cancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-6">
            <FieldGroup>
              {/* Nome */}
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
        </div>
      </FormContainer>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dict.resources.form.confirm_title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dict.resources.form.confirm_description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingData(null)}>
              {dict.resources.form.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {dict.resources.form.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
