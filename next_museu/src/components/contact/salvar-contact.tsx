'use client';

import SaveContactForm from '../forms/contact/SalvarContactForm';
import { PageShell } from '../pageshell/page-shell';

export function Contato() {
  return (
    <>
      <section aria-labelledby="contato-heading">
        <PageShell dynamicPath={false} headingId='contato-heading'>
          <SaveContactForm />
        </PageShell>
      </section>
      ,
    </>
  );
}
