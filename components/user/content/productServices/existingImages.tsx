/* eslint-disable @typescript-eslint/no-explicit-any */
import ImagesWithDeleteButton from '@/components/ui/ImagesWithDeleteButton';
import { deleteExistingProductImages } from '@/redux/features/user/content/products-slice';
import { deleteExistingServiceImages } from '@/redux/features/user/content/services-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ExistingImages = (props: any) => {
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch<any>();
  const handleDeleteOldImage = async (poster_id: any) => {
    const serviceId = props.serviceId;
    const productId = props.productId;
    if (props.existingImages.length < 2) {
      return setMessage('You should need at least one image');
    }
    if (productId) {
      const data: any = { productId, poster_id };
      const response: any = await dispatch(deleteExistingProductImages(data));
      if (response.payload === 'Product poster deleted successfully.') {
        const newArray = props.existingImages.filter(
          (x: any) => x._id !== poster_id,
        );
        props.setExistingImages(newArray);
      }
    }
    if (serviceId) {
      const data = { serviceId, poster_id };
      const response: any = await dispatch(deleteExistingServiceImages(data));
      if (response.payload === 'Service poster deleted successfully.') {
        const newArray = props.existingImages.filter(
          (x: any) => x._id !== poster_id,
        );
        props.setExistingImages(newArray);
      }
    }
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }, [message]);
  return (
    <div>
      <div className="flex gap-x-3 mb-3 w-full overflow-x-auto overflow-y-hidden mt-2">
        {props.existingImages.length > 0 &&
          props.existingImages.map((preview: any, index: number) => (
            <ImagesWithDeleteButton
              handleRemoveImage={handleDeleteOldImage}
              key={index}
              preview={preview}
            />
          ))}
      </div>
      {message && <p className="text-red-500 font-medium">{message}</p>}
    </div>
  );
};

export default ExistingImages;
