/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SpinningLoader } from './loading-skeletons/loaders';

export function Form({
  handleSubmit,
  loading,
  handleRegistration,
  children,
  handleError,
  buttonLabel,
}: {
  handleRegistration: any;
  loading: boolean;
  children: React.ReactNode;
  handleError: any;
  handleSubmit: any;
  buttonLabel: string;
}) {
  return (
    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div className="flex items-end flex-col gap-y-3">{children}</div>
      <button
        className="flex mt-8 w-full justify-center rounded-md bg-gray-900 px-3 h-9 items-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="submit"
      >
        {loading ? <SpinningLoader /> : `${buttonLabel}`}
      </button>
    </form>
  );
}
