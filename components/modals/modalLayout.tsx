/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useRef } from 'react';

interface EditInputLayoutProps {
  children: ReactNode;
  title?: string;
  open: boolean;
  setOpen: any;
}

const ModalLayout: React.FC<EditInputLayoutProps> = props => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root as={Fragment} show={props.open}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-auto md:w-[600px] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">
                <div className="border px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-start sm:ml-4 sm:mt-0 ">
                      {props?.title && (
                        <Dialog.Title
                          as="h3"
                          className="text-xl mb-5 font-semibold leading-6 text-gray-900"
                        >
                          {props.title}
                        </Dialog.Title>
                      )}
                      <div className="mt-2">{props.children}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 gap-x-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalLayout;
