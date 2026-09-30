'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError('');
    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid username or password.');
      return;
    }

    router.push('/meetings/new');
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <label>
        Username
        <input
          id="username"
          name="username"
          required
          className="block w-full rounded border p-2"
        />
      </label>
      <label>
        Password
        <input
          id="password"
          name="password"
          type="password"
          required
          className="block w-full rounded border p-2"
        />
      </label>
      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="rounded bg-foreground px-4 py-2 text-background"
      >
        Sign in
      </button>
    </form>
  );
}
