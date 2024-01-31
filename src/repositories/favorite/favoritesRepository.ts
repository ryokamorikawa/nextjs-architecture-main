'use client';
import { db } from 'common/libs/firebase/client';
import { FirebaseException } from 'common/utils/error/commonExceptions';
import { sleep } from 'common/utils/sleep';
import { type Favorite, favoriteConverter } from 'entities/firestore/favorite/Favorite';
import { type FavoriteInputData } from 'entities/firestore/favorite/FavoriteInputData';
import { FirebaseError } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import type React from 'react';
import { type FavoritesRepository } from 'useCases/favorite/favoritesUseCase';

const collectionName = 'favorite_word2';

/**
 * Future GET Favorites
 * Firestoreで利用される DocumentData型 から アプリケーションで使用するデータ型に整形
 */
export class FirebaseFavoritesRepository implements FavoritesRepository {
  // リトライ処理のエクスポネンシャルバックオフの為の設定値
  private maxRetryDelayMills: number; // 最大遅延時間（ミリ秒）
  private jitterMultiplierRange: Array<number>; // 遅延時間の調整パラメータ

  constructor() {
    this.maxRetryDelayMills = 5000;
    this.jitterMultiplierRange = [0.7, 1.3];
  }
  /**
   * 2つの値の間の乱数を得て、小数点2桁までで返す(mdn web doc参考)
   * @param min 最小値
   * @param max 最大値
   */
  getRandomArbitrary(min: number, max: number): number {
    const num = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(2));
  }

  public getFavorites = async (retryCount = 3, nextRetryDelayMills = 3000): Promise<Favorite[]> => {
    const favorites = new Array<Favorite>();
    try {
      console.log({
        class: 'FirebaseFavoritesRepository',
        method: 'getFavorites',
        retryCount: retryCount,
      });
      // エラーハンドリングテスト（Firebase以外のError・TypeError）
      // let list;
      // list.count = 0;
      // エラーハンドリングテスト（Primitive型テスト）
      // throw 'primitive型テスト';
      // エラーハンドリングテスト（Firebaseエラーテスト・Permission error)
      // const favoritesRef = collection(db, 'favorite_word');

      const favoritesRef = collection(db, collectionName).withConverter(favoriteConverter);
      const favoritesSnapshot = await getDocs(favoritesRef);
      favoritesSnapshot.forEach((doc) => {
        const favorite = doc.data() as Favorite;
        favorites.push(favorite);
      });
      return favorites;
    } catch (error) {
      let retryDelayMills = -1;
      if (error instanceof FirebaseError) {
        console.error({
          class: 'FirebaseFavoritesRepository', // Repository Interfaceでnameのgetter作成するかは別途考慮
          method: 'getFavorites',
          error: error,
        });
        switch (error.code) {
          case 'already-exists' || 'resource-exhausted' || 'unavailable':
            retryDelayMills = nextRetryDelayMills;
            if (retryDelayMills > 0 && retryCount > 0) {
              await sleep(retryDelayMills);
              const jit = this.getRandomArbitrary(
                this.jitterMultiplierRange[0],
                this.jitterMultiplierRange[1]
              );
              retryDelayMills += retryDelayMills * jit;
              retryDelayMills = Math.min(retryDelayMills, this.maxRetryDelayMills);
              await this.getFavorites(--retryCount, retryDelayMills);
            } else {
              throw new FirebaseException(error.message, error.code);
            }
          default:
            throw new FirebaseException(error.message, error.code);
        }
      } else {
        throw error;
      }
    }
  };

  /* Future POST */
  public addDocument = async (
    data: FavoriteInputData,
    retryCount = 3,
    nextRetryDelayMills = 3000
  ): Promise<string> => {
    console.log(`addDocument: entering repository layer`);
    const favoritesRef = collection(db, collectionName).withConverter(favoriteConverter);
    try {
      const result = await addDoc(favoritesRef, data);
      return result.id;
    } catch (error) {
      let retryDelayMills = -1;
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'already-exists' || 'resource-exhausted' || 'unavailable':
            retryDelayMills = nextRetryDelayMills;
            if (retryDelayMills > 0 && retryCount > 0) {
              await sleep(retryDelayMills);
              const jit = this.getRandomArbitrary(
                this.jitterMultiplierRange[0],
                this.jitterMultiplierRange[1]
              );
              retryDelayMills += retryDelayMills * jit;
              retryDelayMills = Math.min(retryDelayMills, this.maxRetryDelayMills);
              await this.addDocument(data, --retryCount, retryDelayMills);
            } else {
              throw new FirebaseException(error.message, error.code);
            }
          default:
            throw new FirebaseException(error.message, error.code);
        }
      } else {
        throw error;
      }
    }
  };

  /* Future PUT */
  public setDocument = async (
    documentId: string,
    data: FavoriteInputData,
    retryCount = 3,
    nextRetryDelayMills = 3000
  ): Promise<void> => {
    try {
      const docSnap = doc(db, collectionName, documentId).withConverter(favoriteConverter);
      if (docSnap.id) {
        await setDoc(docSnap, data);
      } else {
        console.log('No such document!');
        throw new Error('No such document!');
      }
    } catch (error) {
      let retryDelayMills = -1;
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'already-exists' || 'resource-exhausted' || 'unavailable':
            retryDelayMills = nextRetryDelayMills;
            if (retryDelayMills > 0 && retryCount > 0) {
              await sleep(retryDelayMills);
              const jit = this.getRandomArbitrary(
                this.jitterMultiplierRange[0],
                this.jitterMultiplierRange[1]
              );
              retryDelayMills += retryDelayMills * jit;
              retryDelayMills = Math.min(retryDelayMills, this.maxRetryDelayMills);
              await this.setDocument(documentId, data, --retryCount, retryDelayMills);
            } else {
              throw new FirebaseException(error.message, error.code);
            }
          default:
            throw new FirebaseException(error.message, error.code);
        }
      } else {
        throw error;
      }
    }
  };

  /* Stream GET v1: RepositoryでFirestoreをlistenするパターン ⇒ Repository層にUIステート更新の役割が混在してしまう*/
  // Repository側でonSnapshot()を使用してクエリの結果をリッスンし、
  // Presenter層から受け取ったsetSrteamData()で最新のデータに更新
  public getStreamFavorites = async (
    setStreamData: React.Dispatch<React.SetStateAction<Array<Favorite>>>,
    retryCount = 3,
    nextRetryDelayMills = 3000
  ): Promise<Unsubscribe> => {
    try {
      console.log(`getStreamFavorites: entering repository layer`);
      const q = query(collection(db, collectionName)).withConverter(favoriteConverter);

      // 変更の都度 クエリスナップショット（=全ドキュメント）を取得
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const favorites: React.SetStateAction<Array<Favorite>> = [];
        querySnapshot.forEach((doc) => {
          const favorite = doc.data();
          console.log({ favorite: favorite });
          favorites.push(favorite);
        });
        setStreamData(favorites);
      });
      return unsubscribe;
    } catch (error) {
      let retryDelayMills = -1;
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'already-exists' || 'resource-exhausted' || 'unavailable':
            retryDelayMills = nextRetryDelayMills;
            if (retryDelayMills > 0 && retryCount > 0) {
              await sleep(retryDelayMills);
              const jit = this.getRandomArbitrary(
                this.jitterMultiplierRange[0],
                this.jitterMultiplierRange[1]
              );
              retryDelayMills += retryDelayMills * jit;
              retryDelayMills = Math.min(retryDelayMills, this.maxRetryDelayMills);
              await this.getStreamFavorites(setStreamData, --retryCount, retryDelayMills);
            } else {
              throw new FirebaseException(error.message, error.code);
            }
          default:
            throw new FirebaseException(error.message, error.code);
        }
      } else {
        throw error;
      }
    }
  };
}
