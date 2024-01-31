'use client';

import { useTranslation } from 'common/libs/i18n/client';
import { ValidateException } from 'common/utils/error/commonExceptions';
import { useMemo } from 'react';
import { OpenWeatherApiRepository } from 'repositories/weather/weatherRepository';
import { WeatherUseCase } from 'useCases/weather/weatherUseCase';

import { useGetWeather } from './useGetWeather';
import WeatherScreenView from './WeatherScreenView';

// Containerコンポーネント：ロジックを受け取りPropsを渡す役目
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WeatherScreen = ({ lng }: any) => {
  const { t } = useTranslation(lng);

  /**
   *  ViewがPresenterとUsecCase、Repositoryに依存している点については、問題ない。
   * （一番外側のViewが内側の層に依存は問題ない。）
   */
  // usecaseが使用するrepositoryのインスタンス化
  const weatherRepositoryInstance = useMemo(() => new OpenWeatherApiRepository(), []);
  // presenterが使用するusecaseのインスタンス化
  const weatherUsecaseInstance = useMemo(
    () => new WeatherUseCase(weatherRepositoryInstance),
    [weatherRepositoryInstance]
  );
  // presenter層から必要なデータを受け取り Presentational Componentに渡す
  const { city, weather, loading, onChangeCity, onSearchWeather, error } =
    useGetWeather(weatherUsecaseInstance);

  let errorText = undefined;
  if (error !== undefined) {
    // バリデーションチェックエラーの内、文言が定義されている場合のみユーザーに知らせる
    if (error instanceof ValidateException) {
      // i18nextでは、t functionの引数に渡した文字列に一致するキーが無い場合に、引数に渡した文字列がそのまま返る
      if (t(`error.validation.${error.code}`) === `error.validation.${error.code}`) {
        throw error; // 文言が定義されていない場合、予期せぬエラーのためerror.tsxを表示
      } else {
        errorText = t(`error.validation.${error.code}`);
      }
    } else {
      // バリデーションエラー以外のエラーが発生した場合はerror.tsxを表示
      throw error;
    }
  }

  return (
    <WeatherScreenView
      lng={lng}
      city={city}
      weather={weather}
      loading={loading}
      onChangeCity={onChangeCity}
      onSearchWeather={onSearchWeather}
      errorMessage={errorText}
    />
  );
};

export default WeatherScreen;
