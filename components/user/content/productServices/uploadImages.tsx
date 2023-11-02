/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ImagesWithDeleteButton from '@/components/ui/ImagesWithDeleteButton';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

const UploadImages = (props: any) => {
  const fileInputRef = useRef<any>(null);
  const [fileArray, setFileArray] = useState<any>([]);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  function handleMultipleImagesChange(e: any) {
    const files = Array.from(e.target.files);
    props.setFilesToUpload(e.target.files);
    const imagePreviews: any = [];
    const isImageFile = (file: File) => {
      const acceptedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
      return acceptedTypes.includes(file.type);
    };

    files.forEach((file: any) => {
      if (isImageFile(file)) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const fileId = file.name;
          imagePreviews.push({ id: fileId, preview: event.target.result });
          if (imagePreviews.length === files.length) {
            setFileArray(imagePreviews);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const handleRemoveImage = (idToRemove: string) => {
    const temp_files = Array.from(props.filesToUpload).filter(
      (file: any) => file.name !== idToRemove,
    );
    props.setFilesToUpload(temp_files);

    const updatedImagePreviews = fileArray.filter(
      (image: any) => image.id !== idToRemove,
    );
    setFileArray(updatedImagePreviews);
  };

  return (
    <div>
      <div>
        <button
          className="border p-2 rounded-lg border-gray-300"
          onClick={handleFileInputClick}
        >
          Choose Images
        </button>
        <input
          accept="image/jpeg, image/png, image/svg+xml"
          multiple
          onChange={handleMultipleImagesChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type="file"
        />
        <div className="flex gap-x-3 mt-2">{/* ... */}</div>
      </div>
      <div className="flex gap-x-3 w-full overflow-x-auto overflow-y-hidden mt-2">
        {fileArray.map((preview: any, index: number) => (
          <ImagesWithDeleteButton
            handleRemoveImage={() => handleRemoveImage(preview.id)}
            index={index}
            key={index}
            preview={preview}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadImages;
