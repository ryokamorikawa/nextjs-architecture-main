import { expect, test } from '@jest/globals';
import australiaWeatherData from 'common/test/dummyData/australiaWeatherData.json';
import australiaWeatherOutputData from 'common/test/dummyData/australiaWeatherOutputData.json';

import { CurrentWeatherOutputData } from '../CurrentWeatherOutputData';

test('アプリケーション用のデータ型からUIに反映するデータ型に変換して返却する', async () => {
  // renderhookを使用してカスタムフックを呼び出す。
  const weatherResult = CurrentWeatherOutputData.toCurrentWeatherOutputData(australiaWeatherData);
  // UIに反映するデータ型に変換されていることを確認
  expect(weatherResult).toEqual(australiaWeatherOutputData);
});
