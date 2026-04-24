import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { oauthLinksData } from '../../../configs/oauth-links';

export function OAuthLinks() {
  return (
    <div className="flex justify-center gap-2">
      {oauthLinksData.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
          aria-label={link.label}
        >
          <link.icon className="size-4" />
        </Link>
      ))}
    </div>
  );
}
