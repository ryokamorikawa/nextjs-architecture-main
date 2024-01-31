/**
 * @jest-environment jsdom
 */

import { afterEach, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { FirebaseFavoritesRepository } from 'repositories/favorite/favoritesRepository';
import { FavoritesUseCase } from 'useCases/favorite/favoritesUseCase';

import { useAddFavorite } from '../useAddFavorite';
import { FirebaseException, UnknownException } from 'common/utils/error/commonExceptions';

const favoritesRepositoryInstance = new FirebaseFavoritesRepository();
const favoritesUseCaseInstance = new FavoritesUseCase(favoritesRepositoryInstance);
describe('Favorites一覧を非同期で取得する', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Favorites一覧取得できたらUIに反映するデータ型に変換して返却する', async () => {
    // usecaseをモック化
    const spyFavoritesUseCaseInstance = jest
      .spyOn(favoritesUseCaseInstance, 'addDocument')
      .mockResolvedValue('documentId');
    // renderhookを使用してカスタムフックを呼び出す。
    renderHook(async () => {
      const { onClickAdd } = useAddFavorite(favoritesUseCaseInstance);
      // useEffectで囲わないと Too many rendered エラーになる。
      useEffect(() => {
        onClickAdd();
      }, [onClickAdd]);
    });
    // usecaseの関数が呼び出されたことを確認
    await waitFor(() => expect(spyFavoritesUseCaseInstance).toHaveBeenCalled());
  });

  test('FirebaseExceptionをキャッチしたらerrorステートに登録する', async () => {
    const spyFavoritesUseCaseInstance = jest
      .spyOn(favoritesUseCaseInstance, 'addDocument')
      .mockImplementation(() => {
        throw new FirebaseException('dummy error message', 'dummy error code');
      });

    let errorResult: any;
    renderHook(async () => {
      const { error, onClickAdd } = useAddFavorite(favoritesUseCaseInstance);
      errorResult = error;
      useEffect(() => {
        onClickAdd();
      }, [onClickAdd]);
    });

    await waitFor(() => {
      // errorステートに登録されていることを確認
      expect(errorResult).toBeInstanceOf(FirebaseException);
      expect(errorResult.code).toBe('dummy error code');
      expect(errorResult.message).toBe('dummy error message');
    });
  });

  test('ErrorをキャッチしたらUnknownExceptionに変換してerrorステートに登録する', async () => {
    const spyFavoritesUseCaseInstance = jest
      .spyOn(favoritesUseCaseInstance, 'addDocument')
      .mockImplementation(() => {
        throw new Error('dummy error');
      });

    let errorResult: any;
    renderHook(async () => {
      const { error, onClickAdd } = useAddFavorite(favoritesUseCaseInstance);
      errorResult = error;
      useEffect(() => {
        onClickAdd();
      }, [onClickAdd]);
    });

    await waitFor(() => {
      // UnknownExceptionに変換されていることを確認、errorステートに登録されていることを確認
      expect(errorResult).toBeInstanceOf(UnknownException);
      expect(errorResult.code).toBe('');
      expect(errorResult.message).toBe('dummy error');
    });
  });
});
