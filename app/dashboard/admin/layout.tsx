/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Banner from '@/components/admin/banner';
import Tabs from '@/components/ui/tabs';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
const tabs: any = [
  { name: 'Settings', href: '/dashboard/admin/settings', icon: Cog6ToothIcon },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section lang="en">
      <Banner />
      <Tabs tabs={tabs} />
      <div className="pt-5">{children}</div>
    </section>
  );
}
