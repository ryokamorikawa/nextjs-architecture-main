import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestContext,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { afterAll, beforeAll, describe, test } from '@jest/globals';
import fs from 'fs';
import { firebaseConfig } from 'common/libs/firebase/client';
import firebase from 'firebase/compat/app';

let testEnv: RulesTestEnvironment;
let loggedinUser: RulesTestContext;
let unauthenticatedUser: RulesTestContext;
let orgUser: RulesTestContext;
let loggedinUserDb: firebase.firestore.Firestore;
let orgUserDb: firebase.firestore.Firestore;

const myId = 'DnHq1rSyi2dAYxejdN42o42EEmh1';
const theirId = 'mrbE5T36GcMUwheQ7agorbVhglG2';
const myOrgId = 'org_jCMMHxNbM9CELjvp';
const theirOrgId = 'org_PcFoaISu0F51dkJd';

beforeAll(async () => {
  const host = '127.0.0.1';
  const port = 8080;

  testEnv = await initializeTestEnvironment({
    projectId: firebaseConfig.projectId,
    firestore: {
      host,
      port,
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    },
  });
  loggedinUser = testEnv.authenticatedContext(myId, {
    tokenOptions: { token: 'token' },
  });
  orgUser = testEnv.authenticatedContext('alice', { org_id: myOrgId });
  // ログインしていないクライアントのように動作します。
  unauthenticatedUser = testEnv.unauthenticatedContext();

  loggedinUserDb = loggedinUser.firestore();
  orgUserDb = orgUser.firestore();
});

afterAll(async () => {
  //　テスト終了後テスト環境で作成されたすべての RulesTestContexts を破棄します。
  await testEnv.cleanup();
});
describe('Firestore security rules test', () => {
  test('認証済みユーザは "userTest0614"コレクションの自分のドキュメント読み取りできる', async () => {
    const testDoc = loggedinUserDb.collection('userTest0614').doc(myId);
    // ローカルで実行しているが非同期処理
    await assertSucceeds(testDoc.get());
  });
  test('認証済みユーザは 自分のドキュメントのprivateフィールドは読み取りできる', async () => {
    const testDoc = loggedinUserDb
      .collection('userTest0614')
      .doc(myId)
      .collection('private')
      .doc(myId);
    await assertSucceeds(testDoc.get());
    // // withConverter使えない
    // await assertSucceeds(testDoc.withConverter(favoriteConverter).get());
  });
  test('認証済みユーザは "userTest0614"コレクションの他人のドキュメント読み取りできる', async () => {
    const testDoc = loggedinUserDb.collection('userTest0614').doc(theirId);
    // ローカルで実行しているが非同期処理
    await assertSucceeds(testDoc.get());
  });
  test('認証済みユーザでも 他人のドキュメントのprivateフィールドは読み取りできない', async () => {
    const testDoc = loggedinUserDb
      .collection('userTest0614')
      .doc(theirId)
      .collection('private')
      .doc(theirId);
    await assertFails(testDoc.get());
  });
  test('未認証ユーザは "userTest0614"コレクションのドキュメントは読み取りできない', async () => {
    const db = unauthenticatedUser.firestore();
    const testDoc = db.collection('userTest0614').doc(myId);
    await assertFails(testDoc.get());
  });
  test('orgユーザは 自身のorgの"facilities"コレクションのドキュメントは読み取りできる', async () => {
    // const db = orgUser.firestore();
    const testDoc = orgUserDb.collection('mt-facilities').doc(myOrgId);
    await assertSucceeds(testDoc.get());
  });
  test('orgユーザは 他の企業の"facilities"コレクションのドキュメントは読み取りできない', async () => {
    // const db = orgUser.firestore();
    const testDoc = orgUserDb.collection('mt-facilities').doc(theirOrgId);
    await assertFails(testDoc.get());
  });
});
