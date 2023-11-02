/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from './InputWithValidation';
import TagsContainer from './tagsContainer';

type Tag = {
  tag: string;
};

interface Props {
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const Tags: React.FC<Props> = ({ setTags }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Tag>();
  const [tags, setLocalTags] = useState<Tag[]>([]);

  const handleAddTag = (data: Tag) => {
    const newTagId = Math.random().toString(36).substring(2);
    const newTagObject = { _id: newTagId, tag: data.tag };
    setLocalTags((prevTags: any) => {
      const newTags = [...prevTags, newTagObject];
      setTags(newTags);
      return newTags;
    });
    setValue('tag', '');
  };

  const handleError = (errors: any) => {
    console.error(errors);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag: any) => tag._id !== tagToRemove);
    setLocalTags(updatedTags);
    setTags(updatedTags);
  };

  return (
    <div>
      <div className="flex items-start gap-x-3">
        <Controller
          control={control}
          name="tag"
          render={({ field }) => (
            <Input
              {...field}
              error={errors.tag?.message}
              name={'tag'}
              type={'text'}
              validations={{
                ...register('tag', {
                  required: 'Tag is required',
                  minLength: {
                    value: 3,
                    message: 'Tag must be at least 3 characters long',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Tag cannot exceed 10 characters',
                  },
                }),
              }}
            />
          )}
        />
        <button
          className="border mt-2 border-gray-300 rounded-lg h-fit px-3 py-1"
          onClick={handleSubmit(handleAddTag, handleError)}
        >
          Add
        </button>
      </div>
      <div className="flex gap-x-2 mt-1 overflow-x-auto overflow-y-hidden py-2">
        <TagsContainer onDeleteTag={handleRemoveTag} tags={tags} />
      </div>
    </div>
  );
};

export default Tags;
