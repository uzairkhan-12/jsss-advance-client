/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { SpinningLoader } from '@/components/ui/loading-skeletons/loaders';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/ui/InputWithValidation';
import Button from '@/components/ui/button';
import ToggleCheckbox from '@/components/ui/toggleCheckbox';
import {
  createPost,
  editPost,
  getPostByPostId,
} from '@/redux/features/user/user-posts-slice';
import { useAppSelector } from '@/redux/store';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface EditPostProps {
  postId?: string;
  setPostId?: any;
}

const AddEditPost = (props: EditPostProps) => {
  const userId = useAppSelector(
    state => state.userDetailsReducer?.user?.user_id,
  );
  const deleteSuccessMessage = useAppSelector(
    state => state.successMessageReducer.message,
  );
  const post = useAppSelector(state => state.userPostReducer.post);
  const postError = useAppSelector(state => state.userPostReducer.error);
  const dispatch = useDispatch<any>();
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isPin, setIsPin] = useState<boolean>(true);
  function getPostById() {
    dispatch(getPostByPostId(props.postId));
  }

  function resetForm() {
    setValue('title', '');
    setValue('desc', '');
    setIsPin(false);
  }

  function handleAvalaibilityChange() {
    setIsPin(!isPin);
  }

  function preparePayload(data: any) {
    const payload = {
      user_id: userId,
      title: data.title,
      desc: data.desc,
      is_pin: isPin,
      postId: props.postId,
    };
    return payload;
  }

  async function handleAddPost(data: any) {
    setSuccessMessage('');
    setErrorMessage('');
    const newPost = preparePayload(data);
    dispatch(createPost(newPost));
    if (!postError) {
      setSuccessMessage('Post created successfully');
      resetForm();
    } else {
      setErrorMessage('Error while adding post.');
    }
  }

  function handleEdit(data: any) {
    setSuccessMessage('');
    setErrorMessage('');
    const newPost = preparePayload(data);
    dispatch(editPost({ data: newPost, postId: props.postId }));
    if (!postError) {
      setSuccessMessage('Post updated successfully');
      props.setPostId('');
      resetForm();
    } else {
      setErrorMessage('Error while adding post.');
    }
  }

  const handleError = (errors: any) => {
    console.error(errors);
  };

  function handleCancel() {
    props.setPostId('');
    resetForm();
  }

  function successAndErrorMessages() {
    return (
      <div>
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
        {deleteSuccessMessage && (
          <div className="flex items-center gap-x-1 text-red-700">
            <XMarkIcon className="h-5 w-5" /> {deleteSuccessMessage}
          </div>
        )}
      </div>
    );
  }

  function renderButtons() {
    return (
      <div>
        {!props.postId ? (
          <button
            className="border border-gray-300 w-full rounded-lg bg-gray-900 text-white py-2"
            disabled={loading}
            onClick={handleSubmit(handleAddPost, handleError)}
            type="button"
          >
            {loading ? <SpinningLoader /> : 'Update'}
          </button>
        ) : (
          <div className="flex gap-x-3">
            <Button
              buttonStyles="bg-white py-2 w-full border border-gray-200 shadow-md text-gray-900 px-3 py-1 transition-all"
              onClick={handleCancel}
              title="Cancel"
              type="button"
            />
            <Button
              buttonStyles="bg-gray-900 text-white flex w-full border border-gray-200 shadow-md text-gray-900 px-3 py-1 transition-all"
              onClick={handleSubmit(handleEdit, handleError)}
              title="Update"
              type="button"
            />
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setIsPin(post.is_pin);
      setValue('desc', post.desc);
    }
  }, [post]);

  useEffect(() => {
    if (props.postId) {
      getPostById();
    }
    if (!props.postId) {
      resetForm();
    }
  }, [props.postId, userId]);

  return (
    <div>
      <div className="flex flex-col gap-y-3">
        <div className="grid grid-cols-2 gap-x-3">
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
          <ToggleCheckbox
            handleToggleChange={handleAvalaibilityChange}
            isTrue={isPin}
            label="Do you want to pin this post?"
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
        {renderButtons()}
        {successAndErrorMessages()}
      </div>
    </div>
  );
};

export default AddEditPost;
