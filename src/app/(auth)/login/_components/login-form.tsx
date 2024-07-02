'use client';

import { login } from '@/modules/(auth)/actions/auth-actions';
import { useFormState } from 'react-dom';
import { SubmitButton } from './submit-button';

export default function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={action}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              {state?.message ? (
                <input
                  id="email"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              ) : (
                <input
                  id="email"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}

              {state?.errors?.email && (
                <span className="text-xs text-red-500" role="alert">
                  {state.errors.email}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              {state?.errors?.password ? (
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              ) : (
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}

              {state?.errors?.password && (
                <span className="text-xs text-red-500" role="alert">
                  {state.errors.password}
                </span>
              )}
            </div>
          </div>

          <div>
            <SubmitButton title="Sign in" />
            {state?.message && (
              <span className="text-xs text-red-500">{state.message}</span>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up for free
          </a>
        </p>
      </div>
    </div>
  );
}
