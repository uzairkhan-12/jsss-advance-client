/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import ProductsList from './products/products';
import ServicesList from './services/services';
import CardTabs from '@/components/ui/tabs/centeredTabs';

const ProductServicesMain = () => {
  const [activeTab, setActiveTab] = useState('Products');

  const tabsData = [
    { name: 'Products', current: true },
    { name: 'Services', current: false },
  ];

  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

  function renderComponents() {
    switch (activeTab) {
      case 'Products':
        return <ProductsList />;
      case 'Services':
        return <ServicesList />;
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="bg-white h-[350px] overflow-y-auto border border-gray-200 rounded-lg shadow-md custom-scrollbar">
        <div className="flex border-b justify-center">
          <CardTabs
            activeTab={activeTab}
            onTabClick={handleTabClick}
            tabs={tabsData}
          />
        </div>
        <div className="p-4">{renderComponents()}</div>
      </div>
    </div>
  );
};

export default ProductServicesMain;
