'use client';

import Loading from 'app/[lng]/loading';
import { useTranslation } from 'common/libs/i18n/client';
import ErrorToast from 'components/ErrorToast/ErrorToast';
import { FormButton } from 'components/FormButton/FormButton';
import { type CreateUserInputData } from 'entities/authentication/CreateUserInputData';
import { useForm } from 'react-hook-form';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  loading: boolean;
  onRegister: (data: CreateUserInputData) => void;
  errorMessage?: string;
}
// Presentationalコンポーネント：描画のみを行う
const RegisterView = ({ lng, loading, onRegister, errorMessage }: Props) => {
  const { register, handleSubmit } = useForm<CreateUserInputData>();
  const { t } = useTranslation(lng);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="flex h-screen items-center justify-center overflow-hidden bg-black/10 ">
        <div className="w-10/12 bg-white lg:w-5/12">
          <h1 className="absolute flex justify-center p-3">{t('auth.register-screen-title')}</h1>
          <form
            className="p-12 md:p-24"
            onSubmit={handleSubmit((data: CreateUserInputData) => {
              onRegister(data);
            })}
          >
            <div className="mb-6 flex items-center text-lg md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <input
                {...register('email')}
                id="email"
                className="w-full bg-gray-200 py-2 pl-12 focus:outline-none md:py-4"
                placeholder="Email"
                aria-label="email"
              />
            </div>
            <div className="mb-6 flex items-center text-lg md:mb-8">
              <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
              </svg>
              <input
                {...register('password')}
                type="password"
                id="password"
                className="w-full bg-gray-200 py-2 pl-12 focus:outline-none md:py-4"
                placeholder="Password"
                aria-label="password"
              />
            </div>
            <FormButton label={t('auth.register-button')}></FormButton>
          </form>
          {errorMessage ? <ErrorToast message={errorMessage} /> : <></>}
        </div>
      </div>
    );
  }
};

export default RegisterView;
