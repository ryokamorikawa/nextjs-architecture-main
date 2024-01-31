'use client';

import { BaseError, UnknownException } from 'common/utils/error/commonExceptions';
import { type SingInInputData } from 'entities/authentication/SignInInputData';
import { useState } from 'react';
import { type AuthenticationUseCase } from 'useCases/authentication/authenticationUseCase';

export const useSignIn = (authUseCaseInstance: AuthenticationUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BaseError | undefined>(undefined);

  const signIn = async (data: SingInInputData) => {
    setLoading(true);
    try {
      await authUseCaseInstance.signIn(data);
    } catch (error) {
      if (error instanceof BaseError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(new UnknownException(error.message, error.name, ''));
      } else {
        setError(new UnknownException(`${error}`, '', ''));
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    signIn,
    error,
  };
};
