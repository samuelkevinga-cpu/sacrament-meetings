import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({ children }: LayoutProps<'/meetings'>) {
  return (
    <div className="page">
      <div className="page-nav">
        <NavLinks
          links={[
            { href: '/meetings', label: 'All Meetings' },
            { href: '/meetings/current', label: "This Sunday" },
          ]}
        />
      </div>
      {children}
    </div>
  );
}
