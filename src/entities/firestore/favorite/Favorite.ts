import {
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  // serverTimestamp,
  type SnapshotOptions,
} from 'firebase/firestore';

/* quicktypeで自動生成したデータ型 */
export interface Favorite {
  documentId?: string;
  userId?: string;
  timestamp?: number;
  text?: string;
  email?: string;
  isPrivate?: boolean;
}

export const favoriteConverter: FirestoreDataConverter<Favorite> = {
  /**
   * Favorite オブジェクトを Firestore ドキュメントデータへ変換します。
   */
  toFirestore(favorite: Favorite): DocumentData {
    // id は Firestore のパスで表現されるのでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    console.log(favorite.timestamp);
    return {
      userId: favorite.userId,
      // timestamp: serverTimestamp(),
      timestamp: favorite.timestamp,
      text: favorite.text,
      email: favorite.email,
      isPrivate: favorite.isPrivate,
    };
  },

  /**
   * Firestore ドキュメントデータを Favorite オブジェクトへ変換します。
   */
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Favorite {
    const data = snapshot.data(options);
    // Favorite オブジェクトの id プロパティには Firestore ドキュメントの id を入れる。
    return {
      documentId: snapshot.ref.id,
      userId: data.userId,
      timestamp: data.timestamp,
      text: data.text,
      email: data.email,
      isPrivate: data.isPrivate,
    };
  },
};
