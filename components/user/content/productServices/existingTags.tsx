/* eslint-disable @typescript-eslint/no-explicit-any */
import RenderedTags from '@/components/ui/tagsContainer';
import { deleteExistingProductTags } from '@/redux/features/user/content/products-slice';
import { deleteExistingServiceTags } from '@/redux/features/user/content/services-slice';
import React from 'react';
import { useDispatch } from 'react-redux';

const ExistingTags = (props: any) => {
  const dispatch = useDispatch<any>();
  const handleDeleteServiceTag = async (tag_id: any) => {
    const serviceId = props.serviceId;
    const productId = props.productId;
    if (productId) {
      const data = { productId, tag_id };
      const response = await dispatch(deleteExistingProductTags(data));
      if (response.payload === 'Product tag deleted successfully.') {
        const newArray = props.existingTags.filter(
          (x: any) => x._id !== tag_id,
        );
        props.setExistingTags(newArray);
      }
    }
    if (serviceId) {
      const data = { serviceId, tag_id };
      const response = await dispatch(deleteExistingServiceTags(data));
      if (response.payload === 'Service tag deleted successfully.') {
        const newArray = props.existingTags.filter(
          (x: any) => x._id !== tag_id,
        );
        props.setExistingTags(newArray);
      }
    }
  };
  return (
    <div>
      {props.existingTags.length > 0 && (
        <RenderedTags
          onDeleteTag={handleDeleteServiceTag}
          tags={props.existingTags}
        />
      )}
    </div>
  );
};

export default ExistingTags;
