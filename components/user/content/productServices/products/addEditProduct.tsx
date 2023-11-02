/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { SpinningLoader } from '@/components/ui/loading-skeletons/loaders';
import Input from '@/components/ui/InputWithValidation';
import Tags from '@/components/ui/tags';
import {
  createProduct,
  editProduct,
  getProductByProductId,
} from '@/redux/features/user/content/products-slice';
import { useAppSelector } from '@/redux/store';
import extractTags from '@/utils/productServiceFunc';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ExistingImages from '../existingImages';
import ExistingTags from '../existingTags';
import UploadImages from '../uploadImages';
interface AddProductTypes {
  productId?: any;
}
const AddEditProduct = ({ productId }: AddProductTypes) => {
  const loading = useAppSelector(state => state.productsReducer.isLoading);
  const [existingTags, setExistingTags] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const token =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('token') as any)
      : null;
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const dispatch: any = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');
  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
  }, [dispatch]);

  async function getProductById(id: any) {
    const response = await dispatch(getProductByProductId(id));
    const fieldValues = {
      title: response?.payload?.title,
      sub_heading: response?.payload?.sub_heading,
      quantity: response?.payload?.quantity,
      price: response?.payload?.price,
      desc: response?.payload?.desc,
    };

    Object.entries(fieldValues).forEach(([fieldName, value]) => {
      setValue(fieldName, value);
    });
    setExistingTags(response?.payload?.tags);
    setExistingImages(response?.payload?.posters);
  }
  const [fileArray, setFileArray] = useState<any>([]);
  const [filesToUpload, setFilesToUpload] = useState<any>('');
  const [tags, setTags] = useState<{ tag: string }[]>([]);
  const handleAdd = async (data: any) => {
    try {
      if (filesToUpload.length === 0) {
        return setErrorMessage('Please select at least one image');
      }
      if (filesToUpload.length > 5) {
        return setErrorMessage('Only five images are aloud to upload.');
      }
      const formData: any = prepareFormData(data);
      const resultAction: any = await dispatch(createProduct(formData));
      if (createProduct.fulfilled.match(resultAction)) {
        resetForm();
        setSuccessMessage('product added successfully.');
      } else {
        const errorMessage =
          resultAction.payload ||
          'An error occurred while creating the product';
        setErrorMessage(errorMessage);
      }
    } catch (error: any) {
      setErrorMessage(`Failed to create product: ${error.message}`);
    }
  };

  async function handleUpdate(data: any) {
    setErrorMessage('');
    const formData = prepareFormData(data);
    if (existingImages.length === 0 && filesToUpload.length === 0) {
      return setErrorMessage('Please select at least one image');
    }
    if (existingImages.length + filesToUpload.length > 5) {
      return setErrorMessage('Only five images are allowed.');
    }
    const response = await dispatch(editProduct({ formData, productId }));
    if (response.payload.status === 'success') {
      setSuccessMessage('product updated successfully.');
    }
  }

  function resetForm() {
    const valuesToReset: any = {
      title: '',
      sub_heading: '',
      quantity: '',
      price: 0,
      desc: '',
    };

    for (const key in valuesToReset) {
      setValue(key, valuesToReset[key]);
    }

    setFileArray([]);
    setFilesToUpload([]);
  }

  function prepareFormData(data: any) {
    const formData = new FormData();
    formData.append('id', token.user.id);
    formData.append('title', data.title);
    formData.append('sub_heading', data.sub_heading);
    formData.append('quantity', data.quantity);
    formData.append('price', data.price);
    formData.append('desc', data.desc);
    formData.append('tags', JSON.stringify(extractTags(tags)));
    for (let i = 0; i < filesToUpload.length; i++) {
      formData.append('files', filesToUpload[i]);
    }
    return formData;
  }

  // const handleError = (errors: any) => {
  //   console.error(errors);
  // };

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
          <Controller
            control={control}
            name="quantity"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.quantity}
                label="Quantity"
                name={'quantity'}
                type={'number'}
                validations={{
                  ...register('quantity', {
                    required: 'Quantity is required',
                    min: {
                      value: 1,
                      message: 'Quantity must be at least 1',
                    },
                    max: {
                      value: 10000,
                      message: 'Quantity cannot exceed 10,000',
                    },
                  }),
                }}
              />
            )}
          />
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
                <p className="text-red-500">
                  {errors.desc.message?.toString()}
                </p>
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
            productId={productId}
            setExistingTags={setExistingTags}
          />
          <h1>Tags</h1>
          <Tags setTags={setTags} />
        </div>
        <ExistingImages
          existingImages={existingImages}
          productId={productId}
          setExistingImages={setExistingImages}
        />
        <UploadImages
          filesToUpload={filesToUpload}
          setFilesToUpload={setFilesToUpload}
        />
        <button
          className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-800 text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-900 sm:mt-0 sm:w-auto"
          disabled={loading}
          onClick={handleSubmit(productId ? handleUpdate : handleAdd)}
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

export default AddEditProduct;
