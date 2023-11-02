/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ErrorPopup from '@/components/alerts/ErrorPopup';
import Notification from '@/components/alerts/NotificationsPopup';
import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/InputWithValidation';
import { logMessage } from '@/redux/features/notifications/success-slice';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const password = watch('password', '');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const text =
    "Voolt: Where Creativity Meets AI. Harness the power of OpenAI's API to effortlessly generate captivating content for your needs.";
  const [displayText, setDisplayText] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  async function handleRegistration(data: any) {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      setLoading(true);
      const res: any = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/api/register`,
        data,
      );
      if (
        res.data.error ===
        'User already exists with given email or company name!'
      ) {
        setLoading(false);
        setErrorMessage(
          'User already exists with given email or company name!',
        );
        return;
      }
      if (res.status == 200) {
        setLoading(false);
        dispatch(logMessage('account created'));
        setSuccessMessage('account created');
        router.push('/');
      }
    } catch (err: any) {
      setLoading(false);
    }
  }
  const handleError = (errors: any) => {
    console.error(errors);
  };

  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const speed = 40;

    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prevText => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, []);
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
      <div className="flex h-screen flex-row-reverse min-h-full flex-1">
        <div className="absolute top-10 z-50 left-10 lg:hidden flex items-center gap-x-2">
          <Image alt="logo" height={60} src="blackVoltLogo.svg" width={60} />
          <h1 className="text-3xl uppercase text-emerald-500 tracking-widest font-extrabold">
            Volt
          </h1>
        </div>
        <div className="flex relative flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-zinc-200">
          <h2 className="text-center font-bold text-3xl mb-7 text-zinc-800">
            Register
          </h2>
          <div className="mx-auto gap-y-4 w-full max-w-sm lg:w-96">
            <Form
              buttonLabel="Register"
              handleError={handleError}
              handleRegistration={handleRegistration}
              handleSubmit={handleSubmit}
              loading={loading}
            >
              <Input
                error={errors.name}
                name="name"
                placeholder="Name"
                type="text"
                validations={{
                  ...register('name', {
                    required: 'name is required',
                    minLength: {
                      value: 2,
                      message: 'Name should be at least 2 characters',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Name should not exceed 20 characters  ',
                    },
                    validate: {
                      noSpaces: value =>
                        value.trim() === value ||
                        'Name should not have leading or trailing spaces',
                    },
                  }),
                }}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    error={errors.email}
                    placeholder="Email"
                    type="email"
                    {...field}
                  />
                )}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                }}
              />
              <Input
                error={errors.company}
                name="company"
                placeholder="Company"
                type="text"
                validations={register('company', {
                  required: 'company is required',
                  minLength: {
                    value: 2,
                    message: 'company should be at least 2 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'company should not exceed 20 characters',
                  },
                  validate: {
                    noSpaces: value =>
                      value.trim() === value ||
                      'company should not have leading or trailing spaces',
                  },
                })}
              />
              <Input
                error={errors.password}
                name="password"
                placeholder="*****"
                type="password"
                validations={{
                  ...register('password', {
                    required: 'password is required',
                    minLength: {
                      value: 5,
                      message: 'password should be at least 5 characters',
                    },
                    maxLength: {
                      value: 20,
                      message: 'password should not exceed 15 characters',
                    },
                    validate: {
                      noSpaces: value =>
                        value.trim() === value ||
                        'password should not have leading or trailing spaces',
                    },
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
                      value === password || 'Passwords do not match',
                  }),
                }}
              />
            </Form>
            <div className="flex flex-col items-center justify-center space-y-3 mt-10">
              <p>Already have an account?</p>
              <button
                className="border flex items-center justify-center gap-x-2 border-gray-300 text-white bg-gray-900 rounded-lg h-9 ml-1 w-[190px] px-3 py-1.5 text-sm font-semibold leading-6shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => router.push('/')}
              >
                Login
              </button>
            </div>
            <div className="hidden xl:block md:absolute right-0 bottom-5 left-0">
              <div className="flex flex-col items-center bottom-3 justify-center">
                {/* <Image src='/VoltLogo.svg' height={100} width={100} alt="logo" className='bg-zinc-900 p-3' /> */}
                <div className="flex justify-center gap-x-3 mt-3">
                  <p>Term of use</p>
                  <div className="w-[1px] h-full bg-gray-400"></div>
                  <p>Privacy policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="h-screen bg-gray-900 pl-12 pt-12 flex flex-col justify-between">
            <div className="absolute flex items-center gap-x-2">
              <Image alt="logo" height={60} src="VoltLogo.svg" width={60} />
              <h1 className="text-4xl uppercase text-emerald-500 tracking-widest font-extrabold">
                Volt
              </h1>
            </div>
            <div className="my-auto text-white h-[250px] lg:h-[170px] 2xl:h-[170px] w-2/3 2xl:w-1/2">
              <p className="text-xl lg:text-2xl 2xl:text-3xl font-semibold lg:font-bold leading-10 flex">
                {displayText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
