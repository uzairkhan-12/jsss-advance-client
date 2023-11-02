/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/ui/button';
import { useAppSelector } from '@/redux/store';
import { CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function Details() {
  const storeData = useAppSelector(state => state.storeDetailsReducer);

  function renderStoreDetails() {
    if (!storeData.data) {
      return (
        <div className="rounded-xl border border-gray-500 w-full h-[16rem] flex justify-center items-center">
          <h1 className="text-2xl uppercase text-gray-400 font-extralight tracking-widest">
            store banner
          </h1>
        </div>
      );
    }
    if (storeData.data) {
      return (
        <div className="flex flex-col gap-3 p-3">
          <h1 className="font-semibold">{storeData.data.company}</h1>
          <div>
            <h1 className="font-semibold">Founded</h1>
            <p className="text-sm text-gray-500">
              {new Date(
                storeData.data.user_details[0].store_details.foundedAt,
              ).getUTCFullYear()}
            </p>
          </div>
          <div>
            <h1 className="font-semibold">About</h1>
            <p className="text-sm text-gray-500">
              {storeData.data.user_details[0].store_details.about}
            </p>
          </div>
          <div>
            <h1 className="font-semibold">Address</h1>
            <p className="text-sm text-blue-500">
              {storeData.data.user_details[0].store_details.address}
            </p>
          </div>
          <div>
            <h1 className="font-semibold">Hours</h1>
            <div>
              {storeData.data.user_details[0].store_details.hours.map(
                (time: any) => (
                  <div className="text-sm text-gray-500" key={time._id}>
                    {time.day} {time.startTime} {time.endTime}
                  </div>
                ),
              )}
            </div>
          </div>
          <div>
            <h1 className="font-semibold">Phone</h1>
            <p className="text-sm text-blue-500">
              {storeData.data.user_details[0].store_details.phoneNumber}
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {renderStoreDetails()}
      <div className="flex gap-5">
        <Button
          buttonStyles="bg-white border border-gray-200 shadow-md text-gray-900 px-3 py-1 hover:bg-white transition-all"
          icon={<ChatBubbleLeftIcon className="text-gray-900 w-4 h-4" />}
          title="Message"
          type="button"
        />
        <Button
          buttonStyles="bg-white border border-gray-200 shadow-md text-gray-900 px-3 py-1 hover:bg-white transition-all"
          icon={<CalendarIcon className="text-gray-900 w-4 h-4" />}
          title="Schedule"
          type="button"
        />
      </div>
    </>
  );
}
