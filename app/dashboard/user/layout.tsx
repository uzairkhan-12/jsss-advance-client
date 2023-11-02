/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { MainSpinner } from '@/components/ui/loading-skeletons/loaders';
import Tabs from '@/components/ui/tabs';
import Banner from '@/components/user/banner';
import { fetchUserDetails } from '@/redux/features/user/user-details-slice';
import { useAppSelector } from '@/redux/store';
import { ChartBarIcon, UsersIcon } from '@heroicons/react/20/solid';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const tabs: any = [
  { name: 'Content', href: '/dashboard/user/content', icon: DocumentTextIcon },
  { name: 'Data', href: '/dashboard/user/data', icon: ChartBarIcon },
  {
    name: 'Interactions',
    href: '/dashboard/user/interactions',
    icon: UsersIcon,
  },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const { isLoading } = useAppSelector(state => state.userDetailsReducer);

  function renderUserDashboard() {
    if (isLoading) {
      return <MainSpinner />;
    }
    return (
      <section lang="en">
        <Banner />
        <Tabs tabs={tabs} />
        <div className="pt-5">{children}</div>
      </section>
    );
  }

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return <>{renderUserDashboard()}</>;
}
