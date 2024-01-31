'use client';

import { useTranslation } from 'common/libs/i18n/client';
import { FirebaseException } from 'common/utils/error/commonExceptions';
import { useMemo } from 'react';
import { FirebaseAuthenticationRepository } from 'repositories/authentication/authenticationRepository';
import { AuthenticationUseCase } from 'useCases/authentication/authenticationUseCase';

import ForgotPasswordView from './ForgotPasswordView';
import { useForgotPassword } from './useForgotPassword';

// Containerコンポーネント：ロジックを受け取りPropsを渡す役目
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForgotPassword = ({ lng }: any) => {
  // repositoryのインスタンス化
  const { t } = useTranslation(lng);
  const firebaseAuthRepositoryInstance = useMemo(() => new FirebaseAuthenticationRepository(), []);
  // presenterが使用するusecaseのインスタンス化
  const authUseCaseInstance = useMemo(
    () => new AuthenticationUseCase(firebaseAuthRepositoryInstance),
    [firebaseAuthRepositoryInstance]
  );
  const { state, onResetPassword, error } = useForgotPassword(authUseCaseInstance);

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
    <ForgotPasswordView
      lng={lng}
      state={state}
      onReset={onResetPassword}
      errorMessage={errorText}
    />
  );
};
export default ForgotPassword;
