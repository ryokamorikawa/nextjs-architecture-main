/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useTranslation } from 'common/libs/i18n/client';
import Link from 'next/link';
import { Trans } from 'react-i18next';

interface Props {
  lng: any;
  error: any;
  reset: () => void;
}

const Error = ({ lng, error, reset }: Props) => {
  const { t } = useTranslation(lng);
  return (
    <>
      <div className="mx-auto mt-20 flex w-4/5 flex-col items-center justify-center space-y-4">
        <h1 className="text-center text-4xl font-semibold">
          <Trans i18nKey={'error.unknown-exception'} />
        </h1>
        <h4 className="py-10 text-center text-lg font-semibold capitalize text-red-500">
          {error.message}
          {error.code ? '[' + error.code + ']' : ''}
          {error.digest ? '[' + error.digest + ']' : ''}
        </h4>
        <div className="space-x-4">
          <Link className="text-blue-600 underline duration-300 hover:text-red-500" href="/">
            <Trans i18nKey={'error.top-page-link-label'} />
          </Link>
          <Link className="text-blue-600 underline duration-300 hover:text-red-500" href="/contact">
            <Trans i18nKey={'error.contact-us-link-label'} />
          </Link>
          <button onClick={reset}>{t('error.reset')}</button>
        </div>
      </div>
    </>
  );
};

export default Error;
