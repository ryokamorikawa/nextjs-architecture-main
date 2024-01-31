'use client';

import { useTranslation } from 'common/libs/i18n/client';
import { type CurrentWeatherOutputData } from 'entities/weather/CurrentWeatherOutputData';
import Image from 'next/image';
import React from 'react';

export const WeatherDetailsView = ({
  lng,
  data,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  data: CurrentWeatherOutputData;
}) => {
  const { t } = useTranslation(lng);

  return (
    <div className="relative z-10 m-auto flex h-[79vh] w-full max-w-[500px] flex-col justify-between p-4 text-gray-300">
      {/* Top */}
      <div className="relative flex justify-between pt-12">
        <div className="flex flex-col items-center">
          {data.icon ? (
            <Image
              src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
              alt="/"
              width="100"
              height="100"
            />
          ) : (
            <></>
          )}
          <p className="text-2xl">{data.main ? data.main : '-'}</p>
        </div>
        <p className="text-9xl">{data.temp ? data.temp : '-'}&#176;</p>
      </div>
      {/* Bottom */}

      <div className="relative rounded-md bg-black/50 p-8">
        <p className="pb-6 text-center text-2xl">{t('weather.title') + data.name} </p>
        <div className="flex justify-between text-center">
          <div>
            <p className="text-2xl font-bold">{data.feels_like ? data.feels_like : '-'}&#176;</p>
            <p className="text-xl">{t('weather.feels-like')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{data.humidity ? data.humidity : '-'}%</p>
            <p className="text-xl">{t('weather.humidity')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{data.wind_speed ? data.wind_speed : '-'} MPH</p>
            <p className="text-xl">{t('weather.winds-speed')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailsView;
