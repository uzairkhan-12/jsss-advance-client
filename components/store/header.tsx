/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/redux/store';
import { Dialog, Popover } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Button from '../ui/button';
import DetailsSection from './details/details-main';
import { getThemeColor, getUserStoreTheme } from './theme-settings';

export default function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { store_theme, company } = useAppSelector(
    state => state.storeDetailsReducer,
  );

  function getCompanyFromStoreData() {
    if (company) {
      return company;
    }
    return null;
  }

  return (
    <header
      className={`${getThemeColor(getUserStoreTheme(store_theme), 'header')}`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex  items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <DetailsSection />
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
            {getCompanyFromStoreData()}
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          <Button
            buttonStyles="bg-stone-200 text-gray-900 px-3 py-1 hover:bg-white transition-all"
            icon={<ShoppingCartIcon className="text-gray-900 w-4 h-4" />}
            title="Cart"
            type="button"
          />
        </div>
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
              </div>
              <div className="py-6">
                <a
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50/50"
                  href="#"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
