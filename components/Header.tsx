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
    <header className="site-header">
      <div className="site-header-inner">
        <div>
          <p className="ward-name">{WARD_NAME}</p>
          <p className="muted">{today}</p>
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
