import { useAppSelector } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';

/* eslint-disable @typescript-eslint/no-explicit-any */
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
export default function Tabs({ tabs }: any) {
  const pathname = usePathname();
  const { role } = useAppSelector(state => state.authDetailsReducer);
  const router = useRouter();

  function renderFeedback() {
    if (role === 'user') {
      return (
        <button className="text-gray-900 text-sm font-semibold hover:text-blue-500 transition-all">
          Send feedback
        </button>
      );
    }
  }

  return (
    <div className="relative bg-white rounded-lg shadow-md border border-gray-200">
      {/* feedback button  */}
      <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 left-5">
        {renderFeedback()}
      </div>
      <div className="sm:hidden">
        <label className="sr-only" htmlFor="tabs">
          Select a tab
        </label>
        <select
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab: any) => pathname === tab.href).name}
          id="tabs"
          name="tabs"
          onChange={(e: any) => {
            const selectedTab = tabs.find(
              (tab: any) => tab.name === e.target.value,
            );
            if (selectedTab) {
              router.push(selectedTab.href);
            }
          }}
        >
          {tabs.map((tab: any) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block w-fit mx-auto">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab: any) => (
              <a
                className={classNames(
                  pathname === tab.href
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium',
                )}
                href={tab.href}
                key={tab.name}
              >
                <tab.icon
                  aria-hidden="true"
                  className={classNames(
                    pathname === tab.href
                      ? 'text-indigo-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
