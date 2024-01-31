'use client';

import Loading from 'app/[lng]/loading';
import ErrorToast from 'components/ErrorToast/ErrorToast';
import { CurrentWeatherOutputData } from 'entities/weather/CurrentWeatherOutputData';

import SearchBar from './SearchBar';
import WeatherDetailsView from './WeatherDetailsView';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  city: string;
  weather: CurrentWeatherOutputData | undefined;
  loading: boolean;
  onChangeCity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchWeather: () => void;
  errorMessage?: string;
}
const initialData = new CurrentWeatherOutputData('', '', '', '', '', 0, '');

// Presentationalコンポーネント：描画のみを行う
const WeatherScreenView = ({
  lng,
  city,
  weather = initialData,
  loading,
  onChangeCity,
  onSearchWeather,
  errorMessage,
}: Props) => {
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="absolute inset-x-0 z-[1] bg-black/10">
          <SearchBar
            lng={lng}
            target={city}
            onChangeTarget={onChangeCity}
            onClick={onSearchWeather}
          />
          {weather && <WeatherDetailsView lng={lng} data={weather} />}
        </div>
        {/* バリデーションチェックエラーはユーザーにダイアログで知らせる */}
        {errorMessage ? (
          <div className="absolute inset-0 z-[1] bg-black/10">
            <ErrorToast message={errorMessage} />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default WeatherScreenView;
