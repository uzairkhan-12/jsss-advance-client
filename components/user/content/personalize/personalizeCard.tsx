/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Notification from '@/components/alerts/NotificationsPopup';
import RadioSelector from '@/components/ui/radio-group';
import { logMessage } from '@/redux/features/notifications/success-slice';
import { updateStoreTheme } from '@/redux/features/user/user-details-slice';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const themeOptions = [
  {
    name: 'Primary',
    code: 'primary',
  },
  {
    name: 'Blue Shades',
    code: 'blue_shades',
  },
  {
    name: 'Green Shades',
    code: 'green_shades',
  },
  {
    name: 'Dark',
    code: 'dark',
  },
];

const PersonalizeCard = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useAppSelector(
    state => state.userDetailsReducer,
  );
  const success = useAppSelector(state => state.successMessageReducer.message);

  const currentStoreTheme = user?.store_details.store_theme;

  const [selected, setSelected] = useState(
    currentStoreTheme
      ? themeOptions.find(option => option.code === currentStoreTheme)
      : themeOptions[0],
  );

  useEffect(() => {
    if (currentStoreTheme) {
      const selectedTheme = themeOptions.find(
        option => option.code === currentStoreTheme,
      );
      if (selectedTheme) {
        setSelected(selectedTheme);
      }
    }
  }, [currentStoreTheme]);

  const handleThemeChange = (selectedTheme: any) => {
    setSelected(selectedTheme);
    dispatch(updateStoreTheme(selectedTheme.code));
    if (!isLoading && !error) {
      dispatch(logMessage(`Store theme updated to ${selectedTheme.name}`));
    }
  };
  return (
    <>
      {success !== undefined && (
        <Notification header="Notification" notif={success} />
      )}
      <div className=" bg-white w-full border border-gray-200 rounded-lg  shadow-md ">
        <div className="flex mb-3 border-b border-gray-300 items-center justify-center">
          <h5 className=" px-6 py-3 text-lg font-medium leading-tight">
            Personalize
          </h5>
        </div>
        <div className="p-5">
          <RadioSelector
            plans={themeOptions}
            selected={selected}
            setSelected={handleThemeChange}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalizeCard;
