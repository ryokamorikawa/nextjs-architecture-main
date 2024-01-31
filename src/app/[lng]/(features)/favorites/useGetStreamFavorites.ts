'use client';

import { BaseError, UnknownException } from 'common/utils/error/commonExceptions';
import { type Favorite } from 'entities/firestore/favorite/Favorite';
import { FavoriteOutputData } from 'entities/firestore/favorite/FavoriteOutputData';
import { useEffect, useRef, useState } from 'react';
import { type FavoritesUseCase } from 'useCases/favorite/favoritesUseCase';

/* Stream GET */
export const useGetStreamFavorites = (favoritesUseCase: FavoritesUseCase) => {
  const [streamFavorites, setStreamData] = useState<Favorite[]>([]);
  const [streamUiFavorites, setStreamUiFavorites] = useState<(FavoriteOutputData | undefined)[]>(
    []
  );
  const [error2, setError] = useState<BaseError | undefined>(undefined);
  const codeNode = useRef();

  useEffect(() => {
    /* Stream GET v1: RepositoryでFirestoreをlistenするパターン
      ⇒ Repository層にUIステート更新の役割が混在してしまうがストリームの場合は仕方ない
    */
    try {
      favoritesUseCase.getStreamFavorites(setStreamData);
    } catch (error) {
      if (error instanceof BaseError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(new UnknownException(error.message, error.name, ''));
      } else {
        setError(new UnknownException(`${error}`, '', ''));
      }
    }
  }, [favoritesUseCase]);

  useEffect(() => {
    const UiConvertedData = streamFavorites.map((favorite) =>
      FavoriteOutputData.toFavoriteOutputData(favorite)
    );
    setStreamUiFavorites(UiConvertedData);
  }, [streamFavorites]);

  return { streamUIFavorites: streamUiFavorites, codeNode, error2 };
};
