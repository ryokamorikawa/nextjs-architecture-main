'use client';

import { useTranslation } from 'common/libs/i18n/client';
import { FirebaseException } from 'common/utils/error/commonExceptions';
import { FirebaseFavoritesRepository } from 'repositories/favorite/favoritesRepository';
import { FavoritesUseCase } from 'useCases/favorite/favoritesUseCase';

import FirestoreView from './FirestoreView';
import { useAddFavorite } from './useAddFavorite';
import { useGetStreamFavorites } from './useGetStreamFavorites';

// Containerコンポーネント：ロジックを受け取りPropsを渡す役目
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Firestore = ({ lng }: any) => {
  const { t } = useTranslation(lng);

  const favoritesRepositoryInstance = new FirebaseFavoritesRepository();
  const favoritesUseCaseInstance = new FavoritesUseCase(favoritesRepositoryInstance);

  const { documentId, onClickAdd, error } = useAddFavorite(favoritesUseCaseInstance);

  let errorMessage = undefined;
  if (error !== undefined) {
    if (error instanceof FirebaseException) {
      if (
        t(`error.firebase.firestore.${error.code}`) === `error.firebase.firestore.${error.code}`
      ) {
        throw error;
      } else {
        errorMessage = t(`error.firebase.firestore.${error.code}`);
      }
    } else {
      throw error;
    }
  }

  const { streamUIFavorites: streamUiFavorites, error2 } =
    useGetStreamFavorites(favoritesUseCaseInstance);

  let errorText = undefined;
  if (error2 !== undefined) {
    if (error2 instanceof FirebaseException) {
      if (
        t(`error.firebase.firestore.${error2.code}`) === `error.firebase.firestore.${error2.code}`
      ) {
        throw error2;
      } else {
        errorText = t(`error.firebase.firestore.${error2.code}`);
      }
    } else {
      throw error2;
    }
  }
  return (
    <FirestoreView
      lng={lng}
      documentId={documentId}
      onClickAdd={onClickAdd}
      streamUiFavorites={streamUiFavorites}
      errorText={errorText}
      errorMessage={errorMessage}
    />
  );
};

export default Firestore;
