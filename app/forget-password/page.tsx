/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ErrorPopup from '@/components/alerts/ErrorPopup';
import Notification from '@/components/alerts/NotificationsPopup';
import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/InputWithValidation';
import logo from '@/public/VoltLogo.svg';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface UserData {
  email: string;
}

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleError = (errors: any) => {
    console.error(errors);
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  async function handleSendEmail(data: UserData) {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_PATH + '/auth/forgot-password',
      {
        email: data.email,
      },
    );
    if (res.data === 'user does not exist') {
      setLoading(false);
      return setErrorMessage('User does not exist');
    }
    if (res.status === 200) {
      setLoading(false);
      setSuccessMessage('Email sent! please check your email.');
    } else {
      setLoading(false);
      setErrorMessage('Error while sending email');
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
        <div className="sm:mx-auto flex flex-col items-center sm:w-full sm:max-w-sm">
          <div className="bg-gray-900 rounded-md w-fit p-5">
            <img
              alt="Your Company"
              className="mx-auto h-14 w-auto"
              src={logo.src}
            />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            We&apos;ll send a link to your email address
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            buttonLabel="Send Email"
            handleError={handleError}
            handleRegistration={handleSendEmail}
            handleSubmit={handleSubmit}
            loading={loading}
          >
            <Input
              error={errors.email}
              name="email"
              placeholder="Email"
              type="email"
              validations={{
                ...register('email', {
                  required: 'email is required',
                }),
              }}
            />
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
