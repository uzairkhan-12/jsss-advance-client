/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpTrayIcon, CameraIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { SpinningLoader } from '../ui/loading-skeletons/loaders';
import ErrorPopup from '../alerts/ErrorPopup';
import Notification from '../alerts/NotificationsPopup';

export default function BannerCover() {
  const token =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('token') as any)
      : null;

  const [file, setFile] = useState<any>();
  const [showSave, setShowSave] = useState<boolean>(false);
  const [videoPreview, setVideoPreview] = useState<any>();
  const [imagePreview, setImagePreview] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();

  const fileInputRef = useRef<any>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if (!allowedTypes.includes(file?.type)) {
      setError('Only images and mp4 videos are allowed!');
      return;
    }

    setFile(file);
    setShowSave(true);
    if (file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setVideoPreview(reader.result);
          setImagePreview('');
        }
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setVideoPreview('');
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function fetchStoreBanner() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/user-details/api/get-banner/${token?.user.id}`,
      {
        headers: { authorization: 'Bearer ' + token?.accessToken },
      },
    );
    if (res.data.status == 'success') {
      const bannerURL = res.data.store_banner.url;
      const bannerType = res.data.store_banner.type;
      if (bannerType.startsWith('video/')) {
        setVideoPreview(bannerURL);
      } else {
        setImagePreview(bannerURL);
      }
    }
  }

  const handleUploadFile = async (e: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    e.preventDefault();

    if (formData) {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/user-details/api/upload-banner/${token?.user.id}`,
        formData,
        {
          headers: { authorization: 'Bearer ' + token?.accessToken },
        },
      );
      if (res.status === 200) {
        setShowSave(false);
        setLoading(false);
        setSuccess('Banner uploaded successfully!');
      } else {
        setLoading(false);
        setError('An error occured while uploading banner');
      }
    }
  };

  useEffect(() => {
    if (token?.accessToken) {
      fetchStoreBanner();
    }
  }, []);

  return (
    <>
      {error && <ErrorPopup errors={[error]} setError={setError} />}
      {success && (
        <Notification
          header="Notification"
          notif={success}
          setMessage={setSuccess}
        />
      )}
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-col items-center justify-center gap-3 w-fit">
          <button
            className="items-center text-normal rounded-full border border-gray-200 p-2 bg-white/20 text-white hover:bg-white/10 transition-all"
            disabled={loading}
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            <CameraIcon className="w-6 h-6" />
            <input
              name="header"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type="file"
            />
          </button>
          {showSave && (
            <button
              className="text-green-500 border border-green-500/20 bg-green-500/20  rounded-full p-2"
              onClick={handleUploadFile}
            >
              {loading ? (
                <SpinningLoader />
              ) : (
                <ArrowUpTrayIcon className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {!videoPreview && !imagePreview && (
          <div className="rounded-xl border border-gray-500 w-full h-44 flex justify-center items-center">
            <h1 className="text-2xl uppercase text-gray-400 font-extralight tracking-widest">
              store banner
            </h1>
          </div>
        )}
        {videoPreview && !imagePreview && (
          <video
            autoPlay
            className="h-44 object-cover rounded-lg w-full"
            loop
            muted
          >
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {!videoPreview && imagePreview && (
          <div
            className="h-44 object-cover rounded-lg w-full"
            style={{
              backgroundImage: `url(${imagePreview})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        )}
      </div>
    </>
  );
}
