import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({ children }: LayoutProps<'/meetings'>) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6 print:hidden">
        <NavLinks
          links={[
            { href: '/meetings', label: 'All Meetings' },
            { href: '/meetings/current', label: 'This Sunday' },
          ]}
        />
      </div>
      {children}
    </div>
  );
}
