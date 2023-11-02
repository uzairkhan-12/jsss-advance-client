/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transition } from '@headlessui/react';
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dispatch, Fragment, useEffect, useState } from 'react';
export default function ErrorPopup({
  errors,
  setError,
}: {
  errors: any;
  setError?: Dispatch<React.SetStateAction<string | any>>;
}) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setShow(true);
    const timeout = setTimeout(() => {
      setShow(false);
      if (setError) {
        setError(undefined);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errors]);
  if (!errors.length) {
    return <></>;
  }
  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 z-50"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <Transition
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={show}
          >
            <div className="max-w-sm w-full bg-red-100 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-400"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="mb-0 text-sm font-medium text-gray-900">
                      Error!
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      {errors.map((error: any, index: number) => (
                        <li className="mt-1 text-sm text-gray-800" key={index}>
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-red-100 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
