/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeMessage } from '@/redux/features/notifications/success-slice';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Notification({
  notif,
  header = 'Copied!',
  color = 'green',
  setMessage,
}: {
  notif: string;
  header?: string;
  color?: string;
  setMessage?: Dispatch<React.SetStateAction<string | any>>;
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (!notif) {
      return;
    }
    setShow(true);
    const timeout = setTimeout(() => {
      setShow(false);
      dispatch(removeMessage());
      if (setMessage) {
        setMessage(undefined);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [notif]);

  if (!notif) {
    return <></>;
  }

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
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
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className={`h-6 w-6 text-${color}-400`}
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="mb-0 text-sm font-medium text-gray-900">
                      {header}
                    </p>
                    <p className="mb-0 mt-1 text-sm text-gray-500">{notif}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                      type="button"
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
