/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import StoreBanner from '@/components/store/banner';
import StoreHeader from '@/components/store/header';
import {
  getThemeColor,
  getUserStoreTheme,
} from '@/components/store/theme-settings';
import { MainSpinner } from '@/components/ui/loading-skeletons/loaders';
import { fetchStoreDetails } from '@/redux/features/store/store-details-slice';
import { useAppSelector } from '@/redux/store';
import { Inter } from 'next/font/google';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const inter = Inter({ subsets: ['latin'] });

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { company } = useParams();

  const dispatch = useDispatch();
  const { store_theme, isLoading } = useAppSelector(
    state => state.storeDetailsReducer,
  );

  function renderStoreLayout() {
    if (isLoading) {
      return <MainSpinner />;
    }
    return (
      <section
        className={`${getThemeColor(
          getUserStoreTheme(store_theme),
          'background',
        )} h-screen`}
        lang="en"
      >
        <StoreHeader />
        <StoreBanner />
        <div className={`${inter.className} px-10 py-5`}>{children}</div>
      </section>
    );
  }

  useEffect(() => {
    dispatch(fetchStoreDetails({ company: company }));
  }, [dispatch]);

  return <>{renderStoreLayout()}</>;
}
