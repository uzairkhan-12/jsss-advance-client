/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header from '@/components/header';
import { store } from '@/redux/store';
import { Inter } from 'next/font/google';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const persistor = persistStore(store);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <section lang="en">
        <Header />
        <div className={`${inter.className} px-5 lg:px-10 py-5`}>
          {children}
        </div>
      </section>
    </PersistGate>
  );
}
