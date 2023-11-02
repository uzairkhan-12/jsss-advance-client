/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ErrorPopup from '@/components/alerts/ErrorPopup';
import Notification from '@/components/alerts/NotificationsPopup';
import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/InputWithValidation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/features/auth/auth-slice';

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('');
  const success = useAppSelector(state => state.successMessageReducer.message);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const text =
    "Voolt: Where Creativity Meets AI. Harness the power of OpenAI's API to effortlessly generate captivating content for your needs.";
  const [displayText, setDisplayText] = useState('');
  const [loading, setLoading] = useState(false);

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

  async function handleRegistration(data: any) {
    setLoading(true);
    try {
      setErrorMessage('');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/api/login`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const fetchedData = await res.json();
      if (!fetchedData.user) {
        setLoading(false);
        setErrorMessage('Email or password is not valid!');
        return;
      }
      if (fetchedData.accessToken) {
        localStorage.setItem('token', JSON.stringify(fetchedData));
        Cookies.set('token', JSON.stringify(fetchedData), {
          expires: 5 / 24,
          path: '/',
        });
        const { id, name, email, role } = fetchedData.user;
        dispatch(setAuthUser({ uid: id, name, email, role }));
        if (fetchedData.user.role === 'admin') {
          router.push('/dashboard/admin/settings');
        } else {
          router.push('/dashboard/user/data');
        }
      }
    } catch (err: any) {
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }
  const handleError = (errors: any) => {
    console.error(errors);
  };
  return (
    <>
      {errorMessage && <ErrorPopup errors={[errorMessage]} />}
      {success !== undefined && (
        <Notification header="Notification" notif={success} />
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
            Login
          </h2>
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <Form
              buttonLabel="Login"
              handleError={handleError}
              handleRegistration={handleRegistration}
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
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  }),
                }}
              />
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
              {/* <p
                className="font-medium cursor-pointer text-indigo-500 hover:text-indigo-600"
                onClick={() => router.push('/forget-password')}
              >
                Forget password ?
              </p> */}
            </Form>

            <div className="flex flex-col items-center justify-center space-y-3 mt-10">
              <p>Don&apos;t have an account?</p>
              <button
                className="border flex items-center justify-center gap-x-2 border-gray-300 text-white bg-gray-900 rounded-lg h-9 ml-1 w-[190px] px-3 py-1.5 text-sm font-semibold leading-6shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => router.push('/register')}
              >
                Register
              </button>
            </div>
            <div className="hidden md:block md:absolute right-0 bottom-5 left-0">
              <div className="flex flex-col items-center bottom-3 justify-center">
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
