'use client';

import Loading from 'app/[lng]/loading';
import { useTranslation } from 'common/libs/i18n/client';
import ErrorToast from 'components/ErrorToast/ErrorToast';
import { FormButton } from 'components/FormButton/FormButton';
import InputWithIcon from 'components/InputWithIcon/InputWithIcon';
import { type SingInInputData } from 'entities/authentication/SignInInputData';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  loading: boolean;
  signIn: (data: SingInInputData) => void;
  errorMessage?: string;
}

const SignInScreenView = ({ lng, loading, signIn, errorMessage }: Props) => {
  const { register, handleSubmit } = useForm<SingInInputData>();
  const { t } = useTranslation(lng);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="flex h-screen items-center justify-center overflow-hidden bg-black/10 ">
        <div className="w-10/12 bg-white lg:w-5/12">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-800 p-4 md:p-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </div>
          <form
            className="p-12 md:p-20"
            onSubmit={handleSubmit((data: SingInInputData) => {
              signIn(data);
            })}
          >
            <InputWithIcon
              id="email"
              placeholder="Email"
              aria-label="email"
              svgPath="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
              rest={register('email')}
            />
            <InputWithIcon
              id="password"
              placeholder="Password"
              aria-label="password"
              svgPath="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"
              type="password"
              rest={register('password')}
            />
            <FormButton label={t('auth.sign-in')}></FormButton>
            <Link
              className="m-2 flex justify-center text-sm hover:text-gray-600"
              href="/authentication/forgotPassword"
            >
              {t('auth.forgot-password')}
            </Link>
            <Link
              className="m-2 flex justify-center text-sm hover:text-gray-600"
              href="/authentication/register"
            >
              {t('auth.register')}
            </Link>
          </form>
          {errorMessage ? <ErrorToast message={errorMessage} /> : <></>}
        </div>
      </div>
    );
  }
};

export default SignInScreenView;
