'use client';
import {
  ExclamationCircleIcon,
  LinkIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/button';
import { useState } from 'react';
import BannerCover from './banner-cover';
import ModalLayout from '../modals/modalLayout';
import UpdateStoreDetails from './update-store-details';
import PostSection from './posts/post';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
export default function Banner() {
  const [openModal, setOpenModal] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);

  const { company } = useAppSelector(state => state.userDetailsReducer);

  function handleOpenModal() {
    setOpenModal(!openModal);
  }
  function handleOpenPostModal() {
    setOpenPostModal(true);
  }
  return (
    <div className="p-5 rounded-lg bg-primary-dark grid grid-cols-1 lg:grid-cols-2 gap-10 mb-5 shadow-md">
      <ModalLayout open={openModal} setOpen={setOpenModal} title="Details">
        <UpdateStoreDetails />
      </ModalLayout>
      <ModalLayout
        open={openPostModal}
        setOpen={setOpenPostModal}
        title="Posts"
      >
        <PostSection />
      </ModalLayout>
      <div>
        <h1 className="text-3xl font-semibold mb-5 text-white">{company}</h1>
        <div className="flex flex-col lg:flex-row justify-start items-center gap-5">
          <Link
            className="w-full lg:w-fit inline-flex gap-2 items-center justify-center bg-white text-gray-900 text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-black transition-all"
            href={`${process.env.NEXT_PUBLIC_CLIENT_PATH}/store/${company}`}
            target="_blank"
          >
            <LinkIcon className="w-4 h-4" /> Page Link
          </Link>
          <Button
            buttonStyles="w-full lg:w-fit inline-flex gap-2 items-center justify-center bg-white text-gray-900 text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-black transition-all"
            icon={<ExclamationCircleIcon className="w-4 h-4" />}
            onClick={handleOpenModal}
            title="Details"
            type={'button'}
          />
          <Button
            buttonStyles="w-full lg:w-fit inline-flex gap-2 items-center justify-center bg-white text-gray-900 text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-black transition-all"
            icon={<PencilIcon className="w-4 h-4" />}
            onClick={handleOpenPostModal}
            title="Posts"
            type="button"
          />
        </div>
      </div>
      <BannerCover />
    </div>
  );
}
