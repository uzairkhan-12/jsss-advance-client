/* eslint-disable @typescript-eslint/no-explicit-any */
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
export default function CardTabs(props: any) {
  return (
    <div>
      <div className="sm:hidden">
        <label className="sr-only" htmlFor="tabs">
          Select a tab
        </label>
        <select
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={props.tabs.find((tab: any) => tab.current).name}
          id="tabs"
          name="tabs"
        >
          {props.tabs.length > 0 &&
            props.tabs.map((tab: any) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b cursor-pointer border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {props.tabs.length > 0 &&
              props.tabs.map((tab: any) => (
                <a
                  className={classNames(
                    tab.name === props.activeTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                  )}
                  href={tab.href}
                  key={tab.name}
                  onClick={() => props.onTabClick(tab.name)}
                >
                  {tab.name}
                </a>
              ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
