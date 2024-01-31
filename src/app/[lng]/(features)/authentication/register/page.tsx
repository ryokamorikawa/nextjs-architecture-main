'use client';

import { useTranslation } from 'common/libs/i18n/client';
import { FirebaseException } from 'common/utils/error/commonExceptions';
import { useMemo } from 'react';
import { FirebaseAuthenticationRepository } from 'repositories/authentication/authenticationRepository';
import { AuthenticationUseCase } from 'useCases/authentication/authenticationUseCase';

import RegisterView from './RegisterView';
import { useRegister } from './useRegister';

// Containerコンポーネント：ロジックを受け取りPropsを渡す役目
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Register = ({ lng }: any) => {
  const { t } = useTranslation(lng);
  // repositoryのインスタンス化
  const firebaseAuthRepositoryInstance = useMemo(() => new FirebaseAuthenticationRepository(), []);
  // presenterが使用するusecaseのインスタンス化
  const authUseCaseInstance = useMemo(
    () => new AuthenticationUseCase(firebaseAuthRepositoryInstance),
    [firebaseAuthRepositoryInstance]
  );
  const { loading, registerWithEmailAndPassword, error } = useRegister(authUseCaseInstance);

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

  return (
    <RegisterView
      lng={lng}
      loading={loading}
      onRegister={registerWithEmailAndPassword}
      errorMessage={errorText}
    />
  );
};
export default Register;
