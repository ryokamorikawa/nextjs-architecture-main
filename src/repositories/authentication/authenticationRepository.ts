'use client';
import { auth } from 'common/libs/firebase/client';
import { FirebaseException } from 'common/utils/error/commonExceptions';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { signIn as signInByNextAuth, signOut as signOutByNextAuth } from 'next-auth/react';
import { type AuthenticationRepository } from 'useCases/authentication/authenticationUseCase';

const origin =
  typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

export class FirebaseAuthenticationRepository implements AuthenticationRepository {
  async createUser(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      // TODO: NextAuthの処理を追加
      await signInByNextAuth('credentials', {
        idToken,
        callbackUrl: `${origin}/`, // 認証成功後に遷移するページ
      });
      console.log('### signUp success');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error({
          class: 'FirebaseAuthenticationRepository', // Repository Interfaceでnameのgetter作成するかは別途考慮
          method: 'createUser',
          error: error,
        });
        throw new FirebaseException(error.message, error.code);
      } else {
        throw error;
      }
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    console.log('### authRepo signIn');
    try {
      // Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // NextAuthを利用してユーザー情報をCookieに保存
      const idToken = await userCredential.user.getIdToken();
      await signInByNextAuth('credentials', {
        idToken,
        callbackUrl: `${origin}/`, // 認証成功後に遷移するページ
      });
      console.log('### signIn success');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error({
          class: 'FirebaseAuthenticationRepository', // Repository Interfaceでnameのgetter作成するかは別途考慮
          method: 'signIn',
          error: error,
        });
        throw new FirebaseException(error.message, error.code);
      } else {
        throw error;
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      // Firebase
      await signOut(auth);
      // NextAuth
      await signOutByNextAuth();
      console.log('### signOut success');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error({
          class: 'FirebaseAuthenticationRepository', // Repository Interfaceでnameのgetter作成するかは別途考慮
          method: 'signOut',
          error: error,
        });
        throw new FirebaseException(error.message, error.code);
      } else {
        throw error;
      }
    }
  }
  async resetPassword(email: string): Promise<void> {
    console.log('### authRepo forgotPassword');
    try {
      const actionCodeSettings = {
        // パスワード再設定後にログイン画面にリダイレクトさせる
        url: `${origin}/login`,
        handleCodeInApp: false,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error({
          class: 'FirebaseAuthenticationRepository', // Repository Interfaceでnameのgetter作成するかは別途考慮
          method: 'resetPassword',
          error: error,
        });
        throw new FirebaseException(error.message, error.code);
      } else {
        throw error;
      }
    }
  }
}
