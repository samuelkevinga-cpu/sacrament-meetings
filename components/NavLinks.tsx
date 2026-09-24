'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Client Component so we can read the current route and style the active link.

interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex gap-4">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={
              isActive
                ? 'font-semibold text-foreground underline'
                : 'text-foreground/70 hover:text-foreground'
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
