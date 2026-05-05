'use client';

import { useDictionary } from '../../service/providers/i18n-providers';
import { SignInForm } from '../forms/auth/SignInForm';
import {
  Auth,
  AuthDescription,
  AuthForm,
  AuthHeader,
  AuthTitle,
} from './auth-layout';

export function SignIn() {
  const dict = useDictionary();
  return (
    <section aria-labelledby="sigin-heading">
      {' '}
      <Auth>
        <AuthHeader>
          <AuthTitle headingId="sigin-heading">
            {dict.auth.login.title}
          </AuthTitle>
          <AuthDescription>{dict.auth.login.description}</AuthDescription>
        </AuthHeader>
        <AuthForm>
          <SignInForm />
        </AuthForm>
      </Auth>
    </section>
  );
}
