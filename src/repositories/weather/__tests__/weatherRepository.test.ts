import { describe, expect, test } from '@jest/globals';
import { OpenWeatherApiRepository } from '../weatherRepository';
import { HttpException } from 'common/utils/error/commonExceptions';

const weatherRepositoryInstance = new OpenWeatherApiRepository();

const dubaiRowData = {
  coord: { lon: 55.3047, lat: 25.2582 },
  weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
  base: 'stations',
  main: {
    temp: 310.15,
    feels_like: 313.97,
    temp_min: 308.31,
    temp_max: 310.29,
    pressure: 998,
    humidity: 39,
  },
  visibility: 7000,
  wind: { speed: 3.09, deg: 180 },
  clouds: { all: 35 },
  dt: 1692936991,
  sys: { type: 1, id: 7537, country: 'AE', sunrise: 1692928596, sunset: 1692974754 },
  timezone: 14400,
  id: 292223,
  name: 'Dubai',
  cod: 200,
};
const convertedData = {
  coord: {
    lon: 55.3047,
    lat: 25.2582,
  },
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d',
    },
  ],
  base: 'stations',
  main: {
    temp: 310.15,
    feels_like: 313.97,
    temp_min: 308.31,
    temp_max: 310.29,
    pressure: 998,
    humidity: 39,
  },
  visibility: 7000,
  wind: {
    speed: 3.09,
    deg: 180,
  },
  clouds: {
    all: 35,
  },
  dt: 1692936991,
  sys: {
    type: 1,
    id: 7537,
    country: 'AE',
    sunrise: 1692928596,
    sunset: 1692974754,
  },
  timezone: 14400,
  id: 292223,
  name: 'Dubai',
  cod: 200,
};

const unmockedFetch = global.fetch;
afterAll(() => {
  global.fetch = unmockedFetch;
});

// axiosからfetchに変更（fetchのmock参考：https://widen.tokyo/jest-fetch-mock-test/）
describe('天気情報取得APIテスト', () => {
  test('APIからのstatus codeが200の場合のアプリで利用するデータ型に変換されること', async () => {
    const dataMock = () =>
      Promise.resolve({ status: 200, json: () => Promise.resolve(dubaiRowData) });
    global.fetch = jest.fn().mockImplementation(dataMock);
    const result = await weatherRepositoryInstance.getWeather('Dubai');
    expect(result).toEqual(convertedData);
  });

  test('APIからのstatus codeが401の場合のエラーメッセージの確認', async () => {
    const dataMock = () => Promise.resolve({ status: 401, data: {} });
    global.fetch = jest.fn().mockImplementation(dataMock);
    try {
      await weatherRepositoryInstance.getWeather('Dubai');
    } catch (error: any) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.type).toMatch('open-weather-api');
      expect(error.code).toMatch('401');
    }
  });
  test('APIからのstatus codeが404の場合のエラーメッセージの確認', async () => {
    const dataMock = () => Promise.resolve({ status: 404, data: {} });
    global.fetch = jest.fn().mockImplementation(dataMock);
    try {
      await weatherRepositoryInstance.getWeather('Dubai');
    } catch (error: any) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.type).toMatch('open-weather-api');
      expect(error.code).toMatch('404');
    }
  });
  test('APIからのstatus codeが不明の場合はデフォルトのエラーメッセージを返すこと', async () => {
    const dataMock = () => Promise.resolve({ status: 500, data: {} });
    global.fetch = jest.fn().mockImplementation(dataMock);
    try {
      await weatherRepositoryInstance.getWeather('Dubai');
    } catch (error: any) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.type).toMatch('open-weather-api');
      expect(error.code).toMatch('500');
    }
  });
});
