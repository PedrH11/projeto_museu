'use client';

import { useDictionary } from '../../service/providers/i18n-providers';
import { ForgotPasswordForm } from '../forms/auth/ForgotPasswordForm';
import {
  Auth,
  AuthDescription,
  AuthForm,
  AuthHeader,
  AuthTitle,
} from './auth-layout';

export function ForgotPassword() {
  const dict = useDictionary();
  return (
    <section aria-labelledby="forgotpassword-heading">
      <Auth>
        <AuthHeader>
          <AuthTitle headingId='forgotpassword-heading'>{dict.auth.forgotPassword.title}</AuthTitle>
          <AuthDescription>
            {dict.auth.forgotPassword.description}
          </AuthDescription>
        </AuthHeader>
        <AuthForm>
          <ForgotPasswordForm />
        </AuthForm>
      </Auth>
    </section>
  );
}
