import { type Favorite } from 'entities/firestore/favorite/Favorite';
import { type FavoriteInputData } from 'entities/firestore/favorite/FavoriteInputData';
import { type Unsubscribe } from 'firebase/firestore';

export interface FavoritesRepository {
  getFavorites: (retryCount?: number, nextRetryDelayMills?: number) => Promise<Favorite[]>;
  addDocument: (
    data: FavoriteInputData,
    retryCount?: number,
    nextRetryDelayMills?: number
  ) => Promise<string>;
  setDocument: (
    documentId: string,
    data: FavoriteInputData,
    retryCount?: number,
    nextRetryDelayMills?: number
  ) => Promise<void>;
  getStreamFavorites: (
    setStreamData: React.Dispatch<React.SetStateAction<Array<Favorite>>>,
    retryCount?: number,
    nextRetryDelayMills?: number
  ) => Promise<Unsubscribe>;
}

export class FavoritesUseCase {
  private readonly favoritesRepository: FavoritesRepository;
  constructor(favoritesRepository: FavoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }
  public getFavorites = async (): Promise<Favorite[]> => {
    // チェック等のビジネスロジックあれば記載
    // repository呼び出し
    const favoriteData = await this.favoritesRepository.getFavorites();
    return favoriteData;
  };

  public addDocument = async (data: FavoriteInputData): Promise<string> => {
    // チェック等のビジネスロジックあれば記載
    // repository呼び出し
    const docmentId = await this.favoritesRepository.addDocument(data);
    return docmentId;
  };

  public getStreamFavorites = (
    setStreamData: React.Dispatch<React.SetStateAction<Array<Favorite>>>
  ): void => {
    // チェック等のビジネスロジックあれば記載
    // repository呼び出し
    this.favoritesRepository.getStreamFavorites(setStreamData);
  };
}
