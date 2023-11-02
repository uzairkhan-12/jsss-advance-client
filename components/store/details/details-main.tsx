/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import FullWidthTab from '@/components/ui/tabs/width-full-tab';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import Details from './details';
import Posts from './posts';
import List from './list';

export default function DetailsSection() {
  const [current, setCurrent] = useState<string>('Details');

  const tabs: any = [
    {
      name: 'Details',
      current: false,
      onClick: () => setCurrent('Details'),
    },
    { name: 'Posts', onClick: () => setCurrent('Posts') },
    { name: 'List', onClick: () => setCurrent('List') },
  ];
  function renderComponent() {
    switch (current) {
      case 'Details':
        return <Details />;
      case 'Posts':
        return <Posts />;
      case 'List':
        return <List />;
      default:
        return null;
    }
  }
  return (
    <Popover.Group className="flex lg:gap-x-12">
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-x-1 bg-stone-200 text-gray-900 px-3 py-1 hover:bg-white transition-all rounded-lg text-sm font-semibold">
          Details
          <ChevronDownIcon
            aria-hidden="true"
            className="h-5 w-5 flex-none text-gray-400"
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -left-8 top-full z-10 mt-8 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              <FullWidthTab current={current} tabs={tabs} />
              {renderComponent()}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  );
}
