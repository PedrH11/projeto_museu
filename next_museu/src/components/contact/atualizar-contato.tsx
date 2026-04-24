'use client';

import Link from 'next/link';
import { useDictionary } from '../../service/providers/i18n-providers';

import { ContactResponse } from '../../schemas/contact-schema';
import UpdateContactForm from '../forms/contact/AtualizarContactForm';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';

export function AtualizarContact({
  idContact,
  contact,
}: {
  idContact: string;
  contact: ContactResponse;
}) {
  const dict = useDictionary();
  return (
    <>
      <section aria-labelledby="contacts-heading">
        <PageShell
          title={dict.contact.management.title}
          description={dict.contact.management.description}
          actions={
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
            >
              <Link href="/dashboard/contact">
                {dict.contact.management.lista_contact}
              </Link>
            </Button>
          }
        >
          <UpdateContactForm contact={contact} idContact={idContact} />
        </PageShell>
      </section>
      ,
    </>
  );
}
