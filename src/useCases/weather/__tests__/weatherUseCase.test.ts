import { afterEach, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { OpenWeatherApiRepository } from 'repositories/weather/weatherRepository';

import { validateParams, WeatherUseCase } from '../weatherUseCase';
import dubaiWeatherData from 'common/test/dummyData/dubaiWeatherData.json';
import { ValidateException } from 'common/utils/error/commonExceptions';

const weatherRepositoryInstance = new OpenWeatherApiRepository();
const weatherUseCaseInstance = new WeatherUseCase(weatherRepositoryInstance);

describe('入力値をチェックして、天気情報を取得する', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('入力値をチェックして、天気情報をWeatherModel型に変換する', async () => {
    const spyWeatherRepository = jest
      .spyOn(weatherRepositoryInstance, 'getWeather')
      .mockReturnValue(new Promise((resolve) => resolve(dubaiWeatherData)));

    const weather = await weatherUseCaseInstance.getWeather('Dubai');

    expect(spyWeatherRepository).toHaveBeenCalledTimes(1);
    expect(weather).toEqual(dubaiWeatherData);
  });

  test('アルファベット以外の値を入力した場合バリエーションエラーが発生する', async () => {
    try {
      await weatherUseCaseInstance.getWeather('123');
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidateException);
      expect(error.code).toBe('invalid-city-name');
      expect(error.message).toBe('city name is not alphabet');
    }
  });
});

describe('入力値チェックテスト', () => {
  test('入力値が数字の場合は、isSucceed: falseになる', () => {
    expect(validateParams('12345')).toEqual({
      isSucceed: false,
      capitalizedCity: '',
    });
  });
  test('入力値が小文字の文字列の場合、一文字目が大文字に変換され返却される', () => {
    expect(validateParams('abcde')).toEqual({
      isSucceed: true,
      capitalizedCity: 'Abcde',
    });
  });
  test('入力値がキャピタライズされた文字列の場合、そのまま返却される', () => {
    expect(validateParams('Abcde')).toEqual({
      isSucceed: true,
      capitalizedCity: 'Abcde',
    });
  });
});
