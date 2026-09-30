import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Bishopric Login | Sacrament Meeting Planner',
  description: 'Sign in to manage sacrament meeting programs.',
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h1 className="mb-6 text-2xl font-bold">Bishopric Login</h1>
      <LoginForm />
    </div>
  );
}
