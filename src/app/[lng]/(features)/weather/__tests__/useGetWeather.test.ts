/**
 * @jest-environment jsdom
 */

import { afterEach, beforeAll, describe, expect, jest, test } from '@jest/globals';
import {
  renderHook,
  waitFor,
  //  waitFor
} from '@testing-library/react';
import { useEffect } from 'react';
import { OpenWeatherApiRepository } from 'repositories/weather/weatherRepository';
import australiaWeatherData from 'common/test/dummyData/australiaWeatherData.json';
import australiaWeatherOutputData from 'common/test/dummyData/australiaWeatherOutputData.json';
import { WeatherUseCase } from 'useCases/weather/weatherUseCase';

import { useGetWeather } from '../useGetWeather';
import {
  BaseError,
  UnknownException,
  ValidateException,
} from 'common/utils/error/commonExceptions';
import { CurrentWeatherOutputData } from 'entities/weather/CurrentWeatherOutputData';

const weatherRepositoryInstance = new OpenWeatherApiRepository();
const weatherUseCaseInstance = new WeatherUseCase(weatherRepositoryInstance);

describe('useGetWeather', () => {
  /* 記載パターン１ */
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('天気情報取得できたらUIに反映するデータ型に変換して返却する', async () => {
    // usecaseをモック化
    const spyWeatherUseCaseInstance = jest
      .spyOn(weatherUseCaseInstance, 'getWeather')
      .mockResolvedValue(australiaWeatherData);
    // renderhookを使用してカスタムフックを呼び出す。
    let weatherResult: unknown;
    renderHook(async () => {
      const { weather, onSearchWeather } = useGetWeather(weatherUseCaseInstance);
      weatherResult = weather;
      // useEffectで囲わないと Too many rendered エラーになる。
      useEffect(() => {
        onSearchWeather();
      }, [onSearchWeather]);
    });
    // UIに反映するデータ型に変換されていることを確認
    await waitFor(() => expect(weatherResult).toEqual(australiaWeatherOutputData));
    // usecaseの関数が呼び出されたことを確認
    await waitFor(() => expect(spyWeatherUseCaseInstance).toHaveBeenCalled());
    /* 記載パターン２ */
    // let result: { current: any };
    // beforeEach(() => {
    //   result = renderHook(() => useGetWeather(weatherUseCaseInstance)).result;
    // });
    // test('天気情報取得できたらUIに反映するデータ型に変換して返却する', async () => {
    //   // usecaseをモック化
    //   const spyWeatherUseCaseInstance = jest
    //     .spyOn(weatherUseCaseInstance, 'getWeather')
    //     .mockResolvedValue(sampleWetherModel);
    // renderhookを使用してカスタムフックを呼び出す。
    // act(() => {
    //   result.current.onSearchWeather();
    // });
    // // UIに反映するデータ型に変換されていることを確認
    // await waitFor(() => expect(result.current.weather).toEqual(australiaWeatherOutputData));
    // usecaseの関数が呼び出されたことを確認
    // await waitFor(() => expect(spyWeatherUseCaseInstance).toHaveBeenCalled());
  });

  test('ValidateExceptionをキャッチしたらerrorステートに登録する', async () => {
    const spyWeatherUseCaseInstance = jest
      .spyOn(weatherUseCaseInstance, 'getWeather')
      .mockImplementation(() => {
        throw new ValidateException('dummy error message', 'dummy error code');
      });

    let errorResult: any;
    let weatherResult: CurrentWeatherOutputData | undefined;
    renderHook(async () => {
      const { error, weather, onSearchWeather } = useGetWeather(weatherUseCaseInstance);
      errorResult = error;
      weatherResult = weather;
      useEffect(() => {
        onSearchWeather();
      }, [onSearchWeather]);
    });

    await waitFor(() => {
      // errorステートに登録されていることを確認
      expect(errorResult).toBeInstanceOf(ValidateException);
      expect(errorResult.code).toBe('dummy error code');
      expect(errorResult.message).toBe('dummy error message');
      // CurrentWeatherOutputDataに空のデータ登録されていることを確認
      expect(weatherResult).toEqual({
        name: '',
        icon: '',
        main: '',
        temp: '',
        feels_like: '',
        humidity: 0,
        wind_speed: '',
      });
    });
  });

  test('ErrorをキャッチしたらUnknownExceptionに変換してerrorステートに登録する', async () => {
    const spyWeatherUseCaseInstance = jest
      .spyOn(weatherUseCaseInstance, 'getWeather')
      .mockImplementation(() => {
        throw new Error('dummy error');
      });

    let errorResult: any;
    let weatherResult: CurrentWeatherOutputData | undefined;
    renderHook(async () => {
      const { error, weather, onSearchWeather } = useGetWeather(weatherUseCaseInstance);
      errorResult = error;
      weatherResult = weather;
      useEffect(() => {
        onSearchWeather();
      }, [onSearchWeather]);
    });

    await waitFor(() => {
      // UnknownExceptionに変換されていることを確認、errorステートに登録されていることを確認
      expect(errorResult).toBeInstanceOf(UnknownException);
      expect(errorResult.code).toBe('');
      expect(errorResult.message).toBe('dummy error');
      // CurrentWeatherOutputDataに空のデータ登録されていることを確認
      expect(weatherResult).toEqual({
        name: '',
        icon: '',
        main: '',
        temp: '',
        feels_like: '',
        humidity: 0,
        wind_speed: '',
      });
    });
  });
});
