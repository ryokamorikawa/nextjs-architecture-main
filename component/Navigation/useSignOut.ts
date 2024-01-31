'use client';

import { BaseError, UnknownException } from 'common/utils/error/commonExceptions';
import { useState } from 'react';
import { type AuthenticationUseCase } from 'useCases/authentication/authenticationUseCase';

export const useSignOut = (authUseCaseInstance: AuthenticationUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BaseError | undefined>(undefined);

  const signOut = async () => {
    setLoading(true);
    try {
      await authUseCaseInstance.signOut();
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
      setLoading(false);
    }
  };

  return {
    loading,
    signOut,
    error,
  };
};
