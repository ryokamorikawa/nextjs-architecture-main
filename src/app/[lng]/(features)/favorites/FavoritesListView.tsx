'use client';

import { useTranslation } from 'common/libs/i18n/client';
import ErrorToast from 'components/ErrorToast/ErrorToast';
import { type FavoriteOutputData } from 'entities/firestore/favorite/FavoriteOutputData';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  streamUiFavorites: (FavoriteOutputData | undefined)[];
  errorMessage?: string;
}
const FavoritesListView = ({ lng, streamUiFavorites, errorMessage }: Props): JSX.Element => {
  const { t } = useTranslation(lng);

  return (
    <div>
      {errorMessage ? (
        <ErrorToast message={errorMessage} />
      ) : streamUiFavorites ? (
        <table>
          <thead className="border border-black">
            <tr>
              <th className="border-r border-black px-4 py-2">
                {t('favorite.favorites-list.document-id')}
              </th>
              <th className="border-r border-black px-4 py-2">
                {t('favorite.favorites-list.message')}
              </th>
              <th className="border-r border-black px-4 py-2">
                {t('favorite.favorites-list.date')}
              </th>
              <th className="border-r border-black px-4 py-2">
                {t('favorite.favorites-list.user-id')}
              </th>
            </tr>
          </thead>
          <tbody>
            {streamUiFavorites.map((favorite, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{favorite?.documentId}</td>
                <td className="border border-black px-4 py-2">{favorite?.text}</td>
                <td className="border border-black px-4 py-2">{favorite?.timestamp}</td>
                <td className="border border-black px-4 py-2">{favorite?.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>データが存在しません。</p>
      )}
    </div>
  );
};

export default FavoritesListView;
