'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, User } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { startTransition, useActionState } from 'react';
import { toast } from 'sonner';
import { excluirContactAction } from '../../../actions/contact/excluir-contact-actions';
import {
  ContactResponse,
  ContactUpdate,
  getContactUpdateSchema,
} from '../../../schemas/contact-schema';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { useResources } from '../../../service/providers/resource-providers';
import { ApiResponse } from '../../../type/api';
import { Field, FieldError, FieldLabel } from '../../ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { FormContainer } from '../form-layout';

const initialState: ApiResponse<ContactResponse> = {
  status: 0,
  mensagem: '',
  erro: null,
  dados: undefined,
  errors: undefined,
};

export default function DeleteContactForm({
  idContact,
  contact,
}: {
  idContact: string;
  contact: ContactResponse;
}) {
  const [state, action, isPending] = useActionState(
    excluirContactAction,
    initialState,
  );
  const dict = useDictionary();
  const form = useForm<ContactUpdate>({
    resolver: zodResolver(getContactUpdateSchema(dict)),
    defaultValues: {
      idContact: contact.idContact,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email,
      message: contact.message,
      agreedToPrivacy: contact.agreedToPrivacy,
      status: contact.status,
    },
  });

  const { resources, loading } = useResources();
  const urlContact = React.useMemo(() => {
    if (loading) return '';
    const resource = resources.find(
      (r) =>
        r.name.toLowerCase() === 'contact' &&
        r.method.includes('PUT') &&
        r.endpoint.includes('contact'),
    );

    return resource?.endpoint || '';
  }, [resources, loading]);

  React.useEffect(() => {
    if (!state) return;

    if (state.status >= 400) {
      toast.error('Erro', {
        description: state.erro || state.mensagem,
      });

      if (state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          form.setError(field as keyof ContactUpdate, {
            type: 'server',
            message: messages?.[0],
          });
        });
      }
    } else {
      toast.success('Sucesso!', {
        description: state.mensagem,
      });

      form.reset(); //
    }
  }, [state, form]);

  function onSubmit() {
    if (!idContact) return toast.error(dict.contact.management.id_not_found);
    startTransition(() => {
      action({ idContact: idContact, url: urlContact });
    });
  }

  return (
    <FormContainer
      title={dict.contact.form.delete_title}
      description={dict.contact.form.delete_description}
      state={state}
      isPending={isPending}
      formId="form-contato"
      onSubmit={form.handleSubmit(onSubmit)}
      action={dict.contact.form.action}
      confirm={dict.contact.form.confirm}
      href="/dashboard/contact"
      cancel={dict.contact.form.cancel}
    >
      <div className="bg-background space-y-4">
        <div className="bg-background space-y-6">
          {/* Grid de 2 Colunas para Nome, Telefone e Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.contact.form.label.firstName}</FieldLabel>
                  <div className="relative">
                    <User className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder={dict.contact.form.label.placeHolderFirstName}
                      className="pl-10"
                    />
                  </div>
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Last Name */}
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.contact.form.label.lastName}</FieldLabel>
                  <div className="relative">
                    <User className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder={dict.contact.form.label.placeHolderLastName}
                      className="pl-10"
                    />
                  </div>
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.contact.form.label.phone}</FieldLabel>
                  <div className="relative">
                    <Phone className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="text"
                      placeholder={dict.contact.form.label.placeHolderPhone}
                      className="pl-10"
                    />
                  </div>
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
                  <FieldLabel>{dict.contact.form.label.email}</FieldLabel>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="email"
                      placeholder={dict.contact.form.label.placeHolderEmail}
                      className="pl-10"
                    />
                  </div>
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Status / Situação (Ocupa a linha toda) */}
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.contact.form.label.status}</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a situação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        {dict.contact.form.open}
                      </SelectItem>
                      <SelectItem value="2">
                        {dict.contact.form.close}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Privacy Policy */}
            <Controller
              name="agreedToPrivacy"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center space-x-3 pt-10">
                    <Checkbox
                      id="privacy"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {dict.contact.form.label.agreedToPrivacy}
                    </label>
                  </div>
                  {fieldState.invalid && fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>

          {/* Message (Ocupa a linha toda) */}
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>{dict.contact.form.label.message}</FieldLabel>
                <Textarea
                  {...field}
                  placeholder={dict.contact.form.label.placeHolderMessage}
                  className="min-h-32 resize-none"
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
