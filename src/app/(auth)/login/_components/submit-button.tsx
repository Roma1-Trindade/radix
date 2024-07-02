import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  title: string;
}

export function SubmitButton({ title }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {pending ? (
        <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
      ) : (
        title
      )}
    </button>
  );
}
