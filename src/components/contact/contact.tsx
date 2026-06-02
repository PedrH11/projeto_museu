'use client';

import SaveContactForm from '../forms/contact/SalvarContactForm';
import { PageShell } from '../pageshell/page-shell';

export function Contato() {
  return (
    <>
      <section aria-labelledby="usuarios-heading">
        <PageShell dynamicPath={false}>
          <SaveContactForm />
        </PageShell>
      </section>
      ,
    </>
  );
}
