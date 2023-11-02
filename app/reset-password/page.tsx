/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ErrorPopup from '@/components/alerts/ErrorPopup';
import Notification from '@/components/alerts/NotificationsPopup';
import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/InputWithValidation';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../public/VoltLogo.svg';
const ResetPassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleError = (errors: any) => {
    console.error(errors);
  };
  const password = watch('password', '');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const query = useSearchParams();
  const uniqueString = query.get('uniqueString');

  async function ResetPassword() {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    const response = await axios.patch(
      process.env.NEXT_PUBLIC_SERVER_PATH + '/auth/reset-password',
      { uniqueString, password },
    );
    if (response.data === 'User doest not exist with the given unique string') {
      setLoading(false);
      return console.log('Link expired!');
    }
    if (response.status === 200) {
      setSuccessMessage('password reset');
      setLoading(false);
      setTimeout(() => router.push('/'), 3000);

      setLoading(false);
    } else {
      setLoading(false);
      console.log(response.data);
    }
  }
  return (
    <>
      {errorMessage && <ErrorPopup errors={[errorMessage]} />}
      {successMessage && (
        <Notification
          header="Notification"
          notif={successMessage}
          setMessage={setSuccessMessage}
        />
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <div className="bg-gray-900 w-fit p-5 rounded-md">
              <img
                alt="Your Company"
                className="mx-auto h-14 w-auto"
                src={logo.src}
              />
            </div>
          </div>
          <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset password
          </h2>
          <Form
            buttonLabel="Reset password"
            handleError={handleError}
            handleRegistration={ResetPassword}
            handleSubmit={handleSubmit}
            loading={loading}
          >
            <Input
              error={errors.password}
              name="password"
              placeholder="*****"
              type="password"
              validations={{
                ...register('password', {
                  required: 'password is required',
                }),
              }}
            />
            <Input
              error={errors.confirmPasswrd}
              name="confirmPasswrd"
              placeholder="*****"
              type="password"
              validations={{
                ...register('confirmPasswrd', {
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === password || 'Passwords do not match', // Custom validation
                }),
              }}
            />
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
