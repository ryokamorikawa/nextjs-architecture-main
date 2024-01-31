import { describe, expect, test } from '@jest/globals';

import { capitalize } from '../capitalize';
/* 
  第1引数：テスト名
  第2引数：テストコードを含む関数
  第3引数：デフォルトのタイムアウト値は2秒 
*/

describe('Common functions test', () => {
  test('Capitalize the letters', () => {
    expect(capitalize('abcde')).toBe('Abcde');
  });
  test('Parameter type number should be returned as it is', () => {
    expect(capitalize('12345')).toBe('12345');
  });
});
