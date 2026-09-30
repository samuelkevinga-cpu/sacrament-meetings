'use client';

import NavLinks from './NavLinks';

const WARD_NAME = 'Maple Grove Ward';

export default function Header() {
  // Client Component so the displayed date is today's date in the browser, not the build date.
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b border-black/[.08] print:hidden dark:border-white/[.145]">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 px-6 py-4">
        <div>
          <p className="text-lg font-semibold">{WARD_NAME}</p>
          <p className="text-sm text-foreground/70">{today}</p>
        </div>
        <NavLinks
          links={[
            { href: '/', label: 'Home' },
            { href: '/meetings', label: 'Meetings' },
          ]}
        />
      </div>
    </header>
  );
}
