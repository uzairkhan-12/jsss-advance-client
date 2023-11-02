/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/redux/store';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { getThemeColor, getUserStoreTheme } from '../theme-settings';

export default function ProductCard({ item }: any) {
  const { store_theme } = useAppSelector(state => state.storeDetailsReducer);

  return (
    <div
      className={`w-full h-full max-w-sm rounded-lg shadow ${getThemeColor(
        getUserStoreTheme(store_theme),
        'cardStyles',
      )}`}
    >
      {/* hero section  */}
      <div className="my-2.5 text-center">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight">{item.title}</h5>
        </a>
        <div className="flex items-center mt-2.5 w-fit mx-auto">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-yellow-300 mr-1"
            fill="currentColor"
            viewBox="0 0 22 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-yellow-300 mr-1"
            fill="currentColor"
            viewBox="0 0 22 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-yellow-300 mr-1"
            fill="currentColor"
            viewBox="0 0 22 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-yellow-300 mr-1"
            fill="currentColor"
            viewBox="0 0 22 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-200 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 22 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
      </div>

      {/* poster holder  */}
      <div className="p-3">
        <div
          className="w-full h-[18rem] rounded-md"
          style={{
            backgroundImage: `url(${item.posters[0]?.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between">
          <a
            className="text-white mx-auto bg-white hover:bg-gray-50 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            href="#"
          >
            <ShoppingCartIcon className="w-5 h-5 text-slate-950" />
          </a>
        </div>
      </div>
    </div>
  );
}
