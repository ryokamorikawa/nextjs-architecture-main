'use client';
import { type States } from 'common/utils/constants/constants';
import { BaseError, UnknownException } from 'common/utils/error/commonExceptions';
import { useState } from 'react';
import { type AuthenticationUseCase } from 'useCases/authentication/authenticationUseCase';

export const useForgotPassword = (authUseCaseInstance: AuthenticationUseCase) => {
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BaseError | undefined>(undefined);
  const [state, setState] = useState<States>('before');

  // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
  const onResetPassword = async (email: string) => {
    setError(undefined);
    setState('processing');
    try {
      await authUseCaseInstance.resetPassword(email);
    } catch (error) {
      if (error instanceof BaseError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(new UnknownException(error.message, error.name, ''));
      } else {
        // Viewから使いやすいように BaseErrorの形に変換
        setError(new UnknownException(`${error}`, '', ''));
      }
    } finally {
      setState('done');
    }
  };

  return { state, onResetPassword, error };
};
