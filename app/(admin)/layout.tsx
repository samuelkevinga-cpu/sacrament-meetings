import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { auth, signOut } from '@/auth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminContent>{children}</AdminContent>;
}

async function AdminContent({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) redirect('/login');

  async function logout() {
    'use server';
    await signOut({ redirectTo: '/login' });
  }

  return (
    <section>
      <div className="mx-auto flex max-w-2xl justify-end px-6 pt-6">
        <form action={logout}>
          <button type="submit" className="underline">
            Sign out
          </button>
        </form>
      </div>
      {children}
    </section>
  );
}
