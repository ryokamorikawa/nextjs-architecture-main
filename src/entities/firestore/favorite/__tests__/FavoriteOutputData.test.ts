import { expect, test } from '@jest/globals';

import { FavoriteOutputData } from '../FavoriteOutputData';
import sampleFavoritesData from 'common/test/dummyData/sampleFavoritesData';
import sampleFavoritesOutputData from 'common/test/dummyData/sampleFavoritesOutputData';

test('アプリケーション用のデータ型からUIに反映するデータ型に変換して返却する', async () => {
  // renderhookを使用してカスタムフックを呼び出す。
  const weatherResult = FavoriteOutputData.toFavoriteOutputData(sampleFavoritesData[0]);
  // UIに反映するデータ型に変換されていることを確認
  expect(weatherResult).toEqual(sampleFavoritesOutputData[0]);
});
