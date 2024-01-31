'use client';

import { useTranslation } from 'common/libs/i18n/client';
import { FirebaseException } from 'common/utils/error/commonExceptions';
import { useMemo } from 'react';
import { FirebaseAuthenticationRepository } from 'repositories/authentication/authenticationRepository';
import { AuthenticationUseCase } from 'useCases/authentication/authenticationUseCase';

import SignInScreenView from './SignInScreenView';
import { useSignIn } from './useSignIn';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SignInScreen = ({ lng }: any) => {
  const { t } = useTranslation(lng);
  // repositoryのインスタンス化
  const firebaseAuthRepositoryInstance = useMemo(() => new FirebaseAuthenticationRepository(), []);
  // presenterが使用するusecaseのインスタンス化
  const authUseCaseInstance = useMemo(
    () => new AuthenticationUseCase(firebaseAuthRepositoryInstance),
    [firebaseAuthRepositoryInstance]
  );

  const { loading, signIn, error } = useSignIn(authUseCaseInstance);

  let errorText = undefined;
  if (error !== undefined) {
    if (error instanceof FirebaseException) {
      if (t(`error.firebase.auth.${error.code}`) === `error.firebase.auth.${error.code}`) {
        throw error;
      } else {
        errorText = t(`error.firebase.auth.${error.code}`);
      }
    } else {
      throw error;
    }
  }

  return <SignInScreenView lng={lng} loading={loading} signIn={signIn} errorMessage={errorText} />;
};

export default SignInScreen;
