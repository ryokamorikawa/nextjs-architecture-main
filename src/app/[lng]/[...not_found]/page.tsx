import { useTranslation } from 'common/libs/i18n';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NotFound = async ({ lng }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);

  return (
    <>
      <div className="mx-auto mt-20 flex w-4/5 flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
        <h4 className="py-10 text-lg font-semibold capitalize text-red-500">
          {t('error.not-found-message')}
        </h4>
        <div className="space-x-4">
          <Link className="text-blue-600 underline duration-300 hover:text-red-500" href="/">
            Homepage
          </Link>
          <Link className="text-blue-600 underline duration-300 hover:text-red-500" href="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
