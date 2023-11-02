/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../ui/InputWithValidation';
import UserDailyHours from './dailyHours';
import axios from 'axios';
import dayjs from 'dayjs';
import { CheckIcon } from '@heroicons/react/20/solid';

type FormData = {
  about: string;
  address: string;
  company_name: string;
  foundedAt: string;
  phoneNumber: any;
};
const UpdateStoreDetails = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [hours, setHours] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getUserDetail();
  }, []);

  async function getUserDetail() {
    const token: any = localStorage.getItem('token');
    const user = JSON.parse(token);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/user-details/api/get-user-details/${user.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );
    if (res.status === 200) {
      setValue(
        'company_name',
        res?.data?.response?.store_details?.company_name,
      );
      setValue(
        'foundedAt',
        dayjs(res?.data?.response?.store_details?.foundedAt).format(
          'YYYY-MM-DD',
        ),
      );
      setValue('about', res?.data?.response?.store_details?.about);
      setValue('address', res?.data?.response?.store_details?.address);
      setValue('phoneNumber', res?.data?.response?.store_details?.phoneNumber);
      if (res.data?.response?.store_details?.hours.length) {
        setHours(res.data?.response.store_details.hours);
      }
    }
  }

  async function handleUpdate(data: any) {
    const token: any = localStorage.getItem('token');
    const user = JSON.parse(token);
    for (let i = 0; i < hours.length; i++) {
      if (
        hours[i]?.day === '' ||
        hours[i]?.startTime === '' ||
        hours[i]?.endTime === ''
      ) {
        return setErrorMessage('Please fill the Business Hours first');
      }
    }
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/user-details/api/update-user-details/${user.user.id}`,
      {
        store_details: {
          company_name: data.company_name,
          foundedAt: data.foundedAt,
          about: data.about,
          address: data.address,
          hours,
          phoneNumber: data.phoneNumber,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );
    if (res.status === 200) {
      setSuccessMessage('Details updated successfully.');
    }
  }

  const handleError = (errors: any) => {
    console.error(errors);
  };

  return (
    <div>
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-3">
          <Controller
            control={control}
            name="company_name"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.company_name}
                label="Company name"
                name={'company_name'}
                type={'text'}
                validations={{
                  ...register('company_name', {
                    required: 'company name is required',
                  }),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="foundedAt"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.foundedAt}
                label="Company start date"
                name={'foundedAt'}
                type={'Date'}
                validations={{
                  ...register('foundedAt', {
                    required: 'start date is required',
                  }),
                }}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <Input
              {...field}
              error={errors.phoneNumber}
              label="Phone number"
              name={'phoneNumber'}
              type={'Number'}
              validations={{
                ...register('phoneNumber', {
                  required: 'Contact is required.',
                  minLength: {
                    value: 10,
                    message: 'Contact number must have exactly 10 numbers',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Contact number must have exactly 10 numbers',
                  },
                }),
              }}
            />
          )}
        />
        <div className="flex flex-col gap-y-1">
          <label>About</label>
          <textarea
            className="border px-2 py-1 border-gray-400 rounded-lg"
            {...register('about', {
              required: 'about is required',
            })}
            name="about"
          ></textarea>
          {errors?.about && (
            <p className="text-red-500">{errors.about.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Address</label>
          <textarea
            className="border px-2 py-1 border-gray-400 rounded-lg"
            {...register('address', {
              required: 'Address is required',
            })}
            name="address"
          ></textarea>
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <UserDailyHours
          errorMessage={errorMessage}
          handleHours={setHours}
          hours={hours}
          setErrorMessage={setErrorMessage}
        />
        <button
          className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-800 text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-900 sm:mt-0 sm:w-auto"
          onClick={handleSubmit(handleUpdate, handleError)}
          type="button"
        >
          Update
        </button>
        {successMessage && (
          <div className="flex items-center gap-x-1 text-green-700">
            <CheckIcon className="h-5 w-5" /> {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateStoreDetails;
