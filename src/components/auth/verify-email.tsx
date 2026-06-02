'use client';

import { useDictionary } from '../../service/providers/i18n-providers';
import { VerifyEmailForm } from '../forms/auth/VerifyEmailForm';
import {
  Auth,
  AuthDescription,
  AuthForm,
  AuthHeader,
  AuthTitle,
} from './auth-layout';

export function VerifyEmail() {
  const dict = useDictionary();
  return (
    <section aria-labelledby="verifyemail-heading">
      <Auth>
        <AuthHeader>
          <AuthTitle headingId="verifyemail">
            {dict.auth.verifyEmail.title}
          </AuthTitle>
          <AuthDescription>{dict.auth.verifyEmail.description}</AuthDescription>
        </AuthHeader>
        <AuthForm>
          <VerifyEmailForm />
        </AuthForm>
      </Auth>
    </section>
  );
}
