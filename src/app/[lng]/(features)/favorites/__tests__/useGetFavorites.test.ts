/**
 * @jest-environment jsdom
 */

import { afterEach, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { FirebaseFavoritesRepository } from 'repositories/favorite/favoritesRepository';
import sampleFavoritesData from 'common/test/dummyData/sampleFavoritesData';

import { FavoritesUseCase } from 'useCases/favorite/favoritesUseCase';

import { useGetFavorites } from '../useGetFavorites';
import sampleFavoritesOutputData from 'common/test/dummyData/sampleFavoritesOutputData';

const favoritesRepositoryInstance = new FirebaseFavoritesRepository();
const favoritesUseCaseInstance = new FavoritesUseCase(favoritesRepositoryInstance);

describe('Favorites一覧を非同期で取得する', () => {
  /* 記載パターン１ */
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Favorites一覧取得できたらUIに反映するデータ型に変換して返却する', async () => {
    // usecaseをモック化
    const spyFavoritesUseCaseInstance = jest
      .spyOn(favoritesUseCaseInstance, 'getFavorites')
      .mockResolvedValue(sampleFavoritesData);
    // renderhookを使用してカスタムフックを呼び出す。
    let favoritesResult: unknown;
    renderHook(async () => {
      const { data, getFutureFavorites } = useGetFavorites(favoritesUseCaseInstance);
      favoritesResult = data;
      // useEffectで囲わないと Too many rendered エラーになる。
      useEffect(() => {
        getFutureFavorites();
      }, [getFutureFavorites]);
    });
    // UIに反映するデータ型に変換されていることを確認
    await waitFor(() => expect(favoritesResult).toEqual(sampleFavoritesOutputData));
    // usecaseの関数が呼び出されたことを確認
    await waitFor(() => expect(spyFavoritesUseCaseInstance).toHaveBeenCalled());
  });
});
