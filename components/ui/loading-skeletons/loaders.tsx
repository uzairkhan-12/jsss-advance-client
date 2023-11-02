export const SidebarLoading = () => {
  return (
    <div>
      <div
        className="max-w-[250px] relative h-screen lg:flex bg-gray-600 lg:flex-col hidden gap-y-5 p-4 space-y-2 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-300 md:p-6 dark:border-gray-500"
        role="status"
      >
        <div className="flex gap-x-3 text-center items-center py-4">
          <div className=" bg-gray-300 rounded-full dark:bg-gray-500 w-8 h-8"></div>
          <div>
            <div className="w-32 h-2 bg-gray-200 mb-2 rounded-full dark:bg-gray-500"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
          </div>
        </div>
        <div className="flex gap-x-3 text-center items-center py-4">
          <div className=" bg-gray-300 rounded-full dark:bg-gray-500 w-8 h-8"></div>
          <div>
            <div className="w-32 h-2 bg-gray-200 mb-2 rounded-full dark:bg-gray-500"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
          </div>
        </div>
        <div className="flex gap-x-3 text-center items-center py-4">
          <div className=" bg-gray-300 rounded-full dark:bg-gray-500 w-8 h-8"></div>
          <div>
            <div className="w-32 h-2 bg-gray-200 mb-2 rounded-full dark:bg-gray-500"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
          </div>
        </div>
        <div className="flex gap-x-3 text-center items-center py-4">
          <div className=" bg-gray-300 rounded-full dark:bg-gray-500 w-8 h-8"></div>
          <div>
            <div className="w-32 h-2 bg-gray-200 mb-2 rounded-full dark:bg-gray-500"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
          </div>
        </div>
        <div className="flex gap-x-3 text-center items-center py-4">
          <div className=" bg-gray-300 rounded-full dark:bg-gray-500 w-8 h-8"></div>
          <div>
            <div className="w-32 h-2 bg-gray-200 mb-2 rounded-full dark:bg-gray-500"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
          </div>
        </div>
        <div className="flex gap-x-3 text-center items-center py-4">
          <div className=" bg-gray-300 rounded-full dark:bg-gray-500 w-8 h-8"></div>
          <div>
            <div className="w-32 h-2 bg-gray-200 mb-2 rounded-full dark:bg-gray-500"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
          </div>
        </div>
        <div className="flex gap-x-3 absolute bottom-0 right-0 left-0 text-center items-center py-4">
          <div className=" bg-gray-300 rounded-full dark:bg-gray-500 w-8 h-8"></div>
          <div>
            <div className="w-32 h-2 bg-gray-200 mb-2 rounded-full dark:bg-gray-500"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpinningLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export const MainSpinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="main-loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const ProductsLoadingSkeliton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse"
        role="status"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse"
        role="status"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse"
        role="status"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
