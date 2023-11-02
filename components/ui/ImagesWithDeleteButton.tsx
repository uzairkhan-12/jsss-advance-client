/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';

const ImagesWithDeleteButton = ({ preview, handleRemoveImage }: any) => {
  return (
    <div className="relative">
      <Image
        alt={`Preview ${preview._id}`}
        className="rounded-lg h-24 object-cover"
        height={100}
        src={preview.url ? preview.url : preview.preview}
        style={{ maxHeight: '100px', maxWidth: '100px' }}
        width={100}
      />
      <button
        className="absolute text-red-600 rounded-full bg-red-50 hover:bg-red-100 top-1 p-[2px] right-1"
        onClick={() => handleRemoveImage(preview._id)}
      >
        <RxCross2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ImagesWithDeleteButton;
