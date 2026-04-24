'use client';

import { useDictionary } from '../../service/providers/i18n-providers';
import { RegisterForm } from '../forms/auth/RegisterForm';
import { Auth, AuthDescription, AuthForm, AuthHeader, AuthTitle } from './auth-layout';

export function Register() {
  const dict = useDictionary();
  return (
    <Auth>
      <AuthHeader>
        <AuthTitle>{dict.auth.register.title}</AuthTitle>
        <AuthDescription>{dict.auth.register.description}</AuthDescription>
      </AuthHeader>
      <AuthForm>
        <RegisterForm />
      </AuthForm>
    </Auth>
  );
}
