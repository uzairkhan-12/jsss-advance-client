/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import FullWidthTab from '@/components/ui/tabs/width-full-tab';
import CardLayout from '@/components/shared/layouts/cardLayout';
import { useState } from 'react';
import CardTabs from '@/components/ui/tabs/centeredTabs';

export default function InteractionsPage() {
  const [current, setCurrent] = useState<string>('Orders');
  const tabsData = [
    { name: 'Orders', current: true },
    { name: 'Schedule', current: false },
  ];

  const handleTabClick = (tabName: any) => {
    setCurrent(tabName);
  };
  function renderComponent() {
    switch (current) {
      case 'Orders':
        return (
          <div className="flex flex-col gap-2 mt-5">
            <h1 className="font-bold">Orders</h1>
            <p>Your orders will render here.</p>
          </div>
        );
      case 'Schedule':
        return (
          <div className="flex flex-col gap-2 mt-5">
            <h1 className="font-bold">Schedule</h1>
            <p>Your schedule will render here.</p>
          </div>
        );
      default:
        return null;
    }
  }
  return (
    <>
      <CardLayout>
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1 grid grid-cols-2 gap-10">
            <CardLayout className="col-span-1">
              <div className="h-[27rem]">
                <div className="text-center border-b border-gray-200 pb-5">
                  <h1 className="font-semibold text-gray-900">Messages</h1>
                </div>
              </div>
            </CardLayout>
            <CardLayout className="col-span-1">
              <div className="h-[27rem]">
                <div className="text-center border-b border-gray-200 pb-5">
                  <h1 className="font-semibold text-gray-900">Notifications</h1>
                </div>
              </div>
            </CardLayout>
          </div>
          <CardLayout className="col-span-1">
            <div className="flex border-b justify-center">
              <CardTabs
                activeTab={current}
                onTabClick={handleTabClick}
                tabs={tabsData}
              />
            </div>
            {renderComponent()}
          </CardLayout>
        </div>
      </CardLayout>
    </>
  );
}
