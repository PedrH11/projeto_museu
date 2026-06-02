'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  getResourcesSchema,
  ResourcesConsultar,
  ResourcesResponse,
} from '../../../schemas/resources-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';
import { FormContainer } from '../form-layout';

type ResourcesResponseProps = ResourcesResponse;

export default function ConsultarResourcesForm({
  resources,
}: {
  resources: ResourcesResponseProps;
}) {
  const dict = useDictionary();
  const form = useForm<ResourcesConsultar>({
    resolver: zodResolver(getResourcesSchema(dict)),
    defaultValues: {
      idResources: resources.idResources,
      nomeResources: resources.nomeResources,
    },
  });

  return (
    <FormContainer
      title={dict.resources.form.consult_title}
      description={dict.resources.form.consult_description}
      formId="form-resources"
      href="/dashboard/resources"
      cancel={dict.resources.form.cancel}
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
  );
}
