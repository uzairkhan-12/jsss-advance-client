/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import voltLogo from '../public/VoltLogo.svg';
import Button from './ui/button';
import { useAppSelector } from '@/redux/store';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const { name }: any = useAppSelector(state => state.authDetailsReducer);

  function handleLogout() {
    localStorage.removeItem('token');
    Cookies.remove('token');
    router.push('/');
  }

  function renderButton() {
    return (
      <div>
        {!name && (
          <div className="py-6">
            <a
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50/50"
              href="#"
            >
              Log in
            </a>
          </div>
        )}
        {name && (
          <div className="flex flex-col lg:justify-end gap-3">
            <h1 className="text-sm font-semibold leading-6 px-3 py-1 text-gray-900 bg-white/30 rounded-lg">
              {name}
            </h1>
            <Button
              buttonStyles="bg-red-500 w-full text-white px-3 py-1 hover:bg-red-700 transition-all"
              onClick={handleLogout}
              title="logout"
              type="button"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <header className="bg-primary-dark">
      <nav
        aria-label="Global"
        className="mx-auto flex  items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a className="-m-1.5 p-1.5" href="/">
            <Image
              alt="volt logo"
              className=""
              height={30}
              src={voltLogo}
              width={40}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
            type="button"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a className="text-sm font-semibold leading-6 text-gray-200" href="#">
            Features
          </a>
        </Popover.Group>
        {name && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
            <h1 className="text-sm font-semibold leading-6 text-gray-200 px-3 py-1 bg-white/30 rounded-lg">
              {name}
            </h1>
            <Button
              buttonStyles="bg-red-500 text-white px-3 py-1 hover:bg-red-700 transition-all"
              onClick={handleLogout}
              title="logout"
              type="button"
              // isLoading?: boolean;
            />
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        onClose={setMobileMenuOpen}
        open={mobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a className="-m-1.5 p-1.5" href="/">
              <Image
                alt="volt logo"
                className=""
                height={30}
                src={voltLogo}
                width={40}
              />
            </a>
            <button
              className="-m-2.5 rounded-md p-2.5 text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
              type="button"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50/50"
                  href="#"
                >
                  Features
                </a>
                {renderButton()}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
