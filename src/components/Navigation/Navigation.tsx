'use client';

import { useTranslation } from 'common/libs/i18n/client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FirebaseAuthenticationRepository } from 'repositories/authentication/authenticationRepository';
import { AuthenticationUseCase } from 'useCases/authentication/authenticationUseCase';

import { Button } from '../Button/Button';
import { useSignOut } from './useSignOut';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  loading: boolean;
  signOut: () => void;
}

export const NavigationView = ({ lng, signOut }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  // console.log('### Navigation session: ', session);
  const { t } = useTranslation(lng);

  return (
    <>
      <header>
        <div className="flex flex-row justify-between ">
          <Link href="/" className="pl-8 pt-5 text-lg font-bold">
            {t('title')}
          </Link>
          <div className=" pr-8 pt-5">
            {user ? (
              <div className="flex flex-row space-x-5">
                <div className="flex space-x-4">
                  <Link href="/favorites">{t('favorite.title')}</Link>
                </div>
                <div>
                  <h3>Email: {user.email}</h3>
                  <h3>ID: {user.uid}</h3>
                </div>
                <Button label={t('auth.sign-out')} onClick={signOut} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Navigation = ({ lng }: any) => {
  // repositoryのインスタンス化
  const firebaseAuthRepositoryInstance = useMemo(() => new FirebaseAuthenticationRepository(), []);
  // presenterが使用するusecaseのインスタンス化
  const authUseCaseInstance = useMemo(
    () => new AuthenticationUseCase(firebaseAuthRepositoryInstance),
    [firebaseAuthRepositoryInstance]
  );

  const { loading, signOut, error } = useSignOut(authUseCaseInstance);

  // エラー発生時はエラー画面を表示
  if (error !== undefined) {
    throw error;
  }

  return <NavigationView lng={lng} loading={loading} signOut={signOut} />;
};

export default Navigation;
