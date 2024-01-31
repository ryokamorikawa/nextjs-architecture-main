'use client';

import { useTranslation } from 'common/libs/i18n/client';
import { Button } from 'components/Button/Button';
import ErrorToast from 'components/ErrorToast/ErrorToast';
import { type FavoriteOutputData } from 'entities/firestore/favorite/FavoriteOutputData';

import FavoritesListView from './FavoritesListView';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  documentId?: string;
  onClickAdd: () => void;
  streamUiFavorites: (FavoriteOutputData | undefined)[];
  errorText?: string;
  errorMessage?: string;
}

const FirestoreView = ({
  lng,
  documentId,
  onClickAdd,
  streamUiFavorites,
  errorText,
  errorMessage,
}: Props) => {
  const { t } = useTranslation(lng);

  return (
    <>
      <div className="container mx-auto max-w-screen-xl flex-1 px-5 py-10">
        <div className="absolute inset-x-0 z-[1] bg-black/10 p-10">
          <h2 className="font-semibold">{t('favorite.add-data')}</h2>
          <Button label="add" onClick={onClickAdd} />
          {documentId ? <p>{documentId}</p> : <></>}
          <h2 className="font-semibold">{t('favorite.get-stream-data')}</h2>{' '}
          <FavoritesListView
            lng={lng}
            streamUiFavorites={streamUiFavorites}
            errorMessage={errorText}
          />
          {errorMessage ? <ErrorToast message={errorMessage} /> : <></>}
        </div>
      </div>
    </>
  );
};

export default FirestoreView;
