'use client';

import { useDictionary } from '../../service/providers/i18n-providers';
import { NewPasswordForm } from '../forms/auth/NewPasswordForm';
import {
  Auth,
  AuthDescription,
  AuthForm,
  AuthHeader,
  AuthTitle,
} from './auth-layout';

export function NewPassword() {
  const dict = useDictionary();
  return (
    <Auth>
      <AuthHeader>
        <AuthTitle>{dict.auth.newPassword.title}</AuthTitle>
        <AuthDescription>{dict.auth.newPassword.description}</AuthDescription>
      </AuthHeader>
      <AuthForm>
        <NewPasswordForm />
      </AuthForm>
    </Auth>
  );
}
