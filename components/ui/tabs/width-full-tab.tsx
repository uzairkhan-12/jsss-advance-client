/* eslint-disable @typescript-eslint/no-explicit-any */

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
export default function FullWidthTab({ tabs, current, gridSize }: any) {
  return (
    <div>
      <div className="sm:hidden">
        <label className="sr-only" htmlFor="tabs">
          Select a tab
        </label>
        <select
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs[0]}
          id="tabs"
          name="tabs"
        >
          {tabs.map((tab: any) => (
            <option key={tab.name} onClick={tab.onClick}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex">
            {tabs.map((tab: any) => (
              <button
                className={classNames(
                  tab.name === current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium',
                  gridSize,
                )}
                key={tab.name}
                onClick={tab.onClick}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
