/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import ErrorPopup from '../alerts/ErrorPopup';
import Notification from '../alerts/NotificationsPopup';

export default function StoreBanner() {
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();

  const { store_banner } = useAppSelector(state => state.storeDetailsReducer);

  function renderStoreBanner() {
    if (!store_banner) {
      return (
        <div className="rounded-xl border border-gray-500 w-full h-[16rem] flex justify-center items-center">
          <h1 className="text-2xl uppercase text-gray-400 font-extralight tracking-widest">
            store banner
          </h1>
        </div>
      );
    }

    if (store_banner && store_banner.type.startsWith('video/')) {
      return (
        <video
          autoPlay
          className="h-[16rem] object-cover rounded-lg w-full"
          loop
          muted
        >
          <source src={store_banner.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (store_banner && !store_banner.type.startsWith('video/')) {
      return (
        <div
          className="h-[16rem] object-cover rounded-lg w-full"
          style={{
            backgroundImage: `url(${store_banner.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      );
    }

    return null;
  }

  return (
    <>
      {error && <ErrorPopup errors={[error]} setError={setError} />}
      {success && (
        <Notification
          header="Notification"
          notif={success}
          setMessage={setSuccess}
        />
      )}
      <div className="flex justify-between items-start gap-5 my-5 mx-10">
        {renderStoreBanner()}
      </div>
    </>
  );
}
