'use client';
import { BaseError, UnknownException } from 'common/utils/error/commonExceptions';
import { useCallback, useState } from 'react';
import { type FavoritesUseCase } from 'useCases/favorite/favoritesUseCase';

export function useAddFavorite(favoritesUseCase: FavoritesUseCase) {
  const [isLoading, setLoading] = useState(false);
  const [documentId, setDocumentId] = useState<string | undefined>();
  const [error, setError] = useState<BaseError | undefined>(undefined);

  // UNIXタイムスタンプを取得する
  const date = new Date();
  const a = date.getTime();
  const timestamp = Math.floor(a / 1000);

  // 追加イベント
  const onClickAdd = useCallback(async () => {
    setLoading(true);

    try {
      const id = await favoritesUseCase.addDocument({
        email: 'aaa@gmail.com',
        text: `test message ${timestamp}`,
        isPrivate: false,
        timestamp: timestamp,
        userId: 'aaaaaaaaa' + timestamp,
      });
      setLoading(false);
      setDocumentId(id);
    } catch (error) {
      if (error instanceof BaseError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(new UnknownException(error.message, error.name, ''));
      } else {
        setError(new UnknownException(`${error}`, '', ''));
      }
    }
  }, [timestamp, favoritesUseCase]);

  return {
    onClickAdd,
    isLoading,
    documentId,
    error,
    setError,
  };
}
