'use client';

import Loading from 'app/[lng]/loading';
import { useTranslation } from 'common/libs/i18n/client';
import { type States } from 'common/utils/constants/constants';
import ErrorToast from 'components/ErrorToast/ErrorToast';
import { FormButton } from 'components/FormButton/FormButton';
import InputWithIcon from 'components/InputWithIcon/InputWithIcon';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  state: States;
  onReset: (email: string) => void;
  errorMessage?: string;
}
// Presentationalコンポーネント：描画のみを行う
const ForgotPasswordView = ({ lng, state, onReset, errorMessage }: Props) => {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();
  const { t } = useTranslation(lng);

  if (state === 'processing') {
    return <Loading />;
  } else {
    return (
      <div className="flex h-screen items-center justify-center overflow-hidden bg-black/10 ">
        <div className="w-10/12 bg-white lg:w-5/12">
          <h1 className="absolute flex justify-center p-3">
            {t('auth.pssword-reset-screen-title')}
          </h1>
          <form
            className="p-12 md:p-24"
            onSubmit={handleSubmit((data) => {
              onReset(data.email);
            })}
          >
            <InputWithIcon
              id="email"
              placeholder="Email"
              aria-label="email"
              svgPath="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
              disabled={state === 'done' && errorMessage === undefined}
              rest={register('email')}
            />
            <FormButton
              label={t('auth.password-reset-button')}
              disabled={state === 'done' && errorMessage === undefined}
            />
          </form>
          {state === 'done' && errorMessage === undefined ? (
            <>
              <p className="flex justify-center">{t('auth.password-reset-message')}</p>
              <Link className="m-2 flex justify-center pb-5 text-sm hover:text-gray-600" href="/">
                {t('auth.back-home-link')}
              </Link>
            </>
          ) : (
            <></>
          )}
          {errorMessage ? <ErrorToast message={errorMessage} /> : <></>}
        </div>
      </div>
    );
  }
};

export default ForgotPasswordView;
