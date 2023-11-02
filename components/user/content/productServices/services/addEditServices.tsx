/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { SpinningLoader } from '@/components/ui/loading-skeletons/loaders';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/ui/InputWithValidation';
import Tags from '@/components/ui/tags';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import UploadImages from '../uploadImages';
import { useDispatch } from 'react-redux';
import {
  createService,
  editService,
  getServiceByServiceId,
} from '@/redux/features/user/content/services-slice';
import { useAppSelector } from '@/redux/store';
import ExistingImages from '../existingImages';
import ExistingTags from '../existingTags';
import extractTags from '@/utils/productServiceFunc';
type FormData = {
  title: string;
  sub_heading: string;
  availablity: boolean;
  desc: string;
  price: number;
  tags: string[];
};
const AddEditServices = ({ serviceId }: any) => {
  const loading = useAppSelector(state => state.servicesReducer.isLoading);
  const token =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('token') as any)
      : null;
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [tags, setTags] = useState<{ tag: string }[]>([]);
  const [availablity, setAvailablity] = useState<any>(true);
  const [fileArray, setFileArray] = useState<any>([]);
  const [filesToUpload, setFilesToUpload] = useState<any>('');
  const [existingImages, setExistingImages] = useState([]);
  const [existingTags, setExistingTags] = useState([]);

  useEffect(() => {
    if (serviceId) {
      getServiceById(serviceId);
    }
  }, []);

  async function getServiceById(id: any) {
    const response = await dispatch(getServiceByServiceId(id));
    if (response.payload) {
      setValue('title', response.payload.title);
      setValue('sub_heading', response.payload.sub_heading);
      setAvailablity(response.payload.availablity);
      setValue('price', response.payload.price);
      setValue('desc', response.payload.desc);
      setExistingTags(response?.payload.tags);
      setExistingImages(response?.payload?.posters);
    }
  }

  async function handleUpdate(data: any) {
    setErrorMessage('');
    const formData = prepareFormData(data);
    if (existingImages.length === 0 && filesToUpload.length === 0) {
      return setErrorMessage('Please select at least one image');
    }
    if (existingImages.length + filesToUpload.length > 5) {
      return setErrorMessage('Only five images are allowed.');
    }
    const response = await dispatch(editService({ formData, serviceId }));
    if (response.payload.status === 'success') {
      setSuccessMessage('service updated successfully.');
    }
  }

  function resetForm() {
    setValue('title', '');
    setValue('sub_heading', '');
    setValue('price', 0);
    setValue('desc', '');
    setFileArray([]);
    setFilesToUpload([]);
  }

  function prepareFormData(data: any) {
    const formData = new FormData();
    formData.append('id', token.user.id);
    formData.append('title', data.title);
    formData.append('sub_heading', data.sub_heading);
    formData.append('availablity', availablity);
    formData.append('price', data.price);
    formData.append('desc', data.desc);
    formData.append('tags', JSON.stringify(extractTags(tags)));
    for (let i = 0; i < filesToUpload.length; i++) {
      formData.append('files', filesToUpload[i]);
    }
    return formData;
  }

  async function handleAdd(data: any) {
    try {
      setErrorMessage('');
      if (filesToUpload.length === 0) {
        return setErrorMessage('Please select at least one image');
      }
      if (filesToUpload.length > 5) {
        return setErrorMessage('Only five images are aloud to upload.');
      }
      const formData: any = prepareFormData(data);
      const resultAction: any = await dispatch(createService(formData));
      if (createService.fulfilled.match(resultAction)) {
        setSuccessMessage('Service added successfully.');
        resetForm();
      } else {
        const errorMessage =
          resultAction.payload ||
          'An error occurred while creating the product';
        setErrorMessage(errorMessage);
      }
    } catch (error: any) {
      setErrorMessage(error);
    }
  }

  function handleAvalaibilityChange(event: any) {
    const isChecked = event.target.checked;
    const availability = isChecked ? 'Yes' : 'No';
    if (availability === 'Yes') {
      setAvailablity(false);
    }
    if (availability === 'No') {
      setAvailablity(true);
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
            name="title"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.title}
                label="Title"
                name={'title'}
                type={'text'}
                validations={{
                  ...register('title', {
                    required: 'Title is required',
                    minLength: {
                      value: 3,
                      message: 'Title must be at least 5 characters long',
                    },
                    maxLength: {
                      value: 40,
                      message: 'Title cannot exceed 50 characters',
                    },
                  }),
                }}
              />
            )}
          />
          <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Availability
            </label>
            <label
              className="inline-flex items-center py-2 rounded-md cursor-pointer dark:text-gray-800"
              htmlFor="Toggle3"
            >
              <input
                className="hidden peer"
                id="Toggle3"
                onChange={handleAvalaibilityChange}
                type="checkbox"
              />
              <span
                className={`px-4 py-1.5 rounded-l-md ${
                  availablity
                    ? 'bg-gray-800 text-white '
                    : 'bg-gray-300 text-black '
                }`}
              >
                Yes
              </span>
              <span
                className={`px-4 py-1.5 rounded-r-md ${
                  !availablity
                    ? ' bg-gray-800 text-white '
                    : ' bg-gray-300 text-black '
                }`}
              >
                No
              </span>
            </label>
          </div>
        </div>
        <div className="flex gap-x-3">
          <Controller
            control={control}
            name="sub_heading"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.sub_heading}
                label="Sub heading"
                name={'sub_heading'}
                type={'text'}
                validations={{
                  ...register('sub_heading', {
                    required: 'Sub heading is required.',
                    minLength: {
                      value: 3,
                      message: 'Sub heading must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Sub heading cannot exceed 50 characters',
                    },
                  }),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.price}
                label="Price"
                name={'price'}
                type={'Number'}
                validations={{
                  ...register('price', {
                    required: 'Price is required.',
                    min: {
                      value: 0,
                      message: 'Price cannot be negative',
                    },
                    max: {
                      value: 1000000,
                      message: 'Price cannot exceed 10,00,000',
                    },
                  }),
                }}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          defaultValue=""
          name="desc"
          render={({ field }) => (
            <div className="flex flex-col gap-y-1">
              <label>Description</label>
              <textarea
                {...field}
                className={`border ${
                  errors.desc ? 'border-red-500' : 'border-gray-400'
                } px-2 py-1 rounded-lg`}
              ></textarea>
              {errors.desc && (
                <p className="text-red-500">{errors.desc.message}</p>
              )}
            </div>
          )}
          rules={{
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters long',
            },
            maxLength: {
              value: 200,
              message: 'Description cannot exceed 200 characters',
            },
          }}
        />
        <div>
          <ExistingTags
            existingTags={existingTags}
            serviceId={serviceId}
            setExistingTags={setExistingTags}
            tagType="service"
          />
          <h1>Tags</h1>
          <Tags setTags={setTags} />
        </div>
        <div>
          <ExistingImages
            existingImages={existingImages}
            posterType="service"
            serviceId={serviceId}
            setExistingImages={setExistingImages}
          />
          <UploadImages
            filesToUpload={filesToUpload}
            setFilesToUpload={setFilesToUpload}
          />
        </div>
        <button
          className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-800 text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-900 sm:mt-0 sm:w-auto"
          disabled={loading}
          onClick={handleSubmit(
            serviceId ? handleUpdate : handleAdd,
            handleError,
          )}
          type="button"
        >
          {loading ? <SpinningLoader /> : 'Update'}
        </button>
        {successMessage && (
          <div className="flex items-center gap-x-1 text-green-700">
            <CheckIcon className="h-5 w-5" /> {successMessage}
          </div>
        )}
        {!successMessage && errorMessage && (
          <div className="flex items-center gap-x-1 text-red-700">
            <XMarkIcon className="h-5 w-5" /> {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEditServices;
