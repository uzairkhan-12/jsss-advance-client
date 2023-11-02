/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

export default function InsightsCard({ title, amount, week_status }: any) {
  return (
    <div className="flex flex-col gap-y-5 border border-gray-200 rounded-lg p-5 h-full">
      <h2 className="text-xs lg:text-base text-gray-500">{title}</h2>
      <h1 className="text-2xl lg:text-3xl font-bold">{amount}</h1>
      <div className="lg:inline-flex justify-start items-center gap-2">
        {week_status >= 0 ? (
          <div className="text-green-500 inline-flex justify-start items-center gap-1">
            {week_status} <ArrowUpIcon className="w-4 h-4" />
          </div>
        ) : (
          <div className="text-red-500 inline-flex justify-start items-center gap-1">
            {week_status} <ArrowDownIcon className="w-4 h-4" />
          </div>
        )}
        <p className="text-xs lg:text-base text-gray-500">than last week</p>
      </div>
    </div>
  );
}
