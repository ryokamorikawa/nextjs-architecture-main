'use client';

import { BaseError, UnknownException } from 'common/utils/error/commonExceptions';
import { type Favorite } from 'entities/firestore/favorite/Favorite';
import { FavoriteOutputData } from 'entities/firestore/favorite/FavoriteOutputData';
import { useCallback, useRef, useState } from 'react';
import { type FavoritesUseCase } from 'useCases/favorite/favoritesUseCase';

/* Future GET Favorites */
export const useGetFavorites = (favoritesUseCase: FavoritesUseCase) => {
  const [data, setData] = useState<FavoriteOutputData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<BaseError | undefined>(undefined);
  const codeNode = useRef();

  const getFutureFavorites = useCallback(async () => {
    setIsLoading(true);
    try {
      const favorites = await favoritesUseCase.getFavorites();
      const favoriteUiData = favorites.map((favorite: Favorite) =>
        FavoriteOutputData.toFavoriteOutputData(favorite)
      );
      setData(favoriteUiData);
    } catch (error) {
      if (error instanceof BaseError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(new UnknownException(error.message, error.name, ''));
      } else {
        // Viewから使いやすいように BaseErrorの形に変換
        setError(new UnknownException(`${error}`, '', ''));
      }
    }

    setIsLoading(false);
  }, [favoritesUseCase]);

  return { getFutureFavorites, codeNode, isLoading, data, error };
};
