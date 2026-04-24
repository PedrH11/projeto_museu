'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  getRolesSchema,
  RolesConsultar,
  RolesResponse,
} from '../../../schemas/roles-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';
import { FormContainer } from '../form-layout';

type RolesResponseProps = RolesResponse;

export default function ConsultarRolesForm({
  roles,
}: {
  roles: RolesResponseProps;
}) {
  const dict = useDictionary();
  const form = useForm<RolesConsultar>({
    resolver: zodResolver(getRolesSchema(dict)),
    defaultValues: {
      idRole: roles.idRole,
      nameRole: roles.nameRole,
    },
  });

  return (
    <FormContainer
      title={dict.roles.form.consult_title}
      description={dict.roles.form.consult_description}
      formId="form-roles"
      href="/dashboard/roles"
      cancel={dict.roles.form.cancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-6">
          <FieldGroup>
            {/* Nome */}
            <Controller
              name="nameRole"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{dict.roles.form.label.nameRole}:</FieldLabel>
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
