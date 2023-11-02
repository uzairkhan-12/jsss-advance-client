/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { ImPushpin } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../redux/features/user/user-posts-slice';
import DeleteModal from '@/components/ui/DeleteModal';
import {
  logMessage,
  removeMessage,
} from '../../../redux/features/notifications/success-slice';
import { usePathname } from 'next/navigation';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import MenuButton from '@/components/user/posts/menuButton';
import { useAppSelector } from '@/redux/store';
import dayjs from 'dayjs';

interface PostCardProps {
  title: string;
  createdAt: any;
  desc: string;
  postId: any;
  userId: any;
  setPostId?: any;
  isPin: boolean;
}

export default function PostCard(props: PostCardProps) {
  const dispatch = useDispatch<any>();
  const isError = useAppSelector(state => state.userPostReducer.error);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { title, createdAt, desc, postId, userId, isPin } = props;
  const pathname = usePathname();
  const currentPath = pathname.split('/');
  const isStore: any = currentPath.includes('store');
  function handleEdit() {
    props.setPostId(postId);
  }
  function handleDelete() {
    const data = { postId, userId };
    dispatch(deletePost(data));
    if (!isError) {
      dispatch(logMessage('post deleted successfully'));
      setTimeout(() => {
        dispatch(removeMessage());
      }, 3000);
    }
  }

  function handleOpenDeleteModal() {
    setOpenDeleteModal(true);
  }

  const options = [
    {
      icon: <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-400" />,
      text: 'Edit Item',
      onClick: handleEdit,
    },
    {
      icon: <TrashIcon className="mr-3 h-5 w-5 text-gray-400" />,
      text: 'Delete Item',
      onClick: handleOpenDeleteModal,
    },
    // Add more options as needed
  ];

  function renderOptionButtonAndPinIcon() {
    return (
      <div className="flex flex-shrink-0 self-center">
        {!isStore ? <MenuButton options={options} /> : isPin && <ImPushpin />}
      </div>
    );
  }

  return (
    <>
      <DeleteModal
        handleCloseModal={handleOpenDeleteModal}
        handleDelete={handleDelete}
        modalHeader="Delete Confirmation"
        modalParagraph="Are you sure you want to delete this item?"
        showDeleteModal={openDeleteModal}
      />
      <div className="py-2 border border-gray-300 rounded-lg px-4 ">
        <div className="flex space-x-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900">
              <a className="flex gap-x-1 items-center">
                {title}
                {isPin && !isStore ? (
                  <ImPushpin className="inline-block mr-2" />
                ) : null}
              </a>
            </p>
            <p className="text-sm text-gray-500">
              <a className="hover:underline">
                {dayjs(createdAt).format('YYYY-MM-DD')}
              </a>
            </p>
            <p>{desc}</p>
          </div>
          {renderOptionButtonAndPinIcon()}
        </div>
      </div>
    </>
  );
}
