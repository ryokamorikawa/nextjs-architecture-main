'use client';

import { BaseError, UnknownException } from 'common/utils/error/commonExceptions';
import { CurrentWeatherOutputData } from 'entities/weather/CurrentWeatherOutputData';
import { useCallback, useState } from 'react';
import { type WeatherUseCase } from 'useCases/weather/weatherUseCase';

// Presenter層
export const useGetWeather = (weatherUsecaseInstance: WeatherUseCase) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<CurrentWeatherOutputData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BaseError | undefined>(undefined);

  // Viewの入力イベントの処理
  const onChangeCity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
      console.log({ city: city });
    },
    [city]
  );
  // Viewの取得イベントの処理
  const onSearchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const result = await weatherUsecaseInstance.getWeather(city);
      const weather: CurrentWeatherOutputData =
        CurrentWeatherOutputData.toCurrentWeatherOutputData(result);
      setWeather(weather);
      setLoading(false);
    } catch (error) {
      if (error instanceof BaseError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(new UnknownException(error.message, error.name, ''));
      } else {
        setError(new UnknownException(`${error}`, '', ''));
      }
      setWeather(new CurrentWeatherOutputData('', '', '', '', '', 0, ''));
      setLoading(false);
    }
  }, [city, weatherUsecaseInstance]);

  return {
    city,
    weather,
    loading,
    onChangeCity,
    onSearchWeather,
    error,
  };
};
