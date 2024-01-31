// admin SDKはNextAuthのcredential認証の際に、クライアントから送られたトークンの検証に利用。
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../../../firebase-adminsdk-key.json');

export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount),
  });

export const auth = getAuth();
