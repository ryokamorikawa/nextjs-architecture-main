import { type Favorite } from './Favorite';
/// Derived model class used in the UI

export class FavoriteOutputData {
  documentId: string | undefined;
  userId: string | undefined;
  text: string | undefined;
  timestamp: string | undefined;

  constructor(_documentId: string, _userId: string, _text: string, _timestamp: string) {
    this.documentId = _documentId;
    this.userId = _userId;
    this.text = _text;
    this.timestamp = _timestamp;
  }

  public static toFavoriteOutputData(favorite: Favorite): FavoriteOutputData {
    let fdate = '-';
    if (favorite.timestamp) {
      const date = new Date(parseInt(favorite.timestamp.toString()));
      fdate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }

    return new FavoriteOutputData(
      favorite && favorite.documentId ? favorite.documentId : '',
      favorite && favorite.userId ? favorite.userId : '',
      favorite && favorite.text ? favorite.text : '',
      fdate
    );
  }
}
