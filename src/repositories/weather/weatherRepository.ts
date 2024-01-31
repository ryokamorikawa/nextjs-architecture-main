import { HttpException } from 'common/utils/error/commonExceptions';
import { Convert, type CurrentWeather } from 'entities/weather/CurrentWeather';
import { type WeatherRepository } from 'useCases/weather/weatherUseCase';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

export class OpenWeatherApiRepository implements WeatherRepository {
  /**
   * API経由で取得できた天気情報をアプリケーション用に整形
   */
  public getWeather = async (city: string): Promise<CurrentWeather> => {
    const url = `${baseUrl}?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    const response = await fetch(url);

    if (response.status === 200) {
      const json = JSON.stringify(await response.json());
      const weather = Convert.toWeatherModel(json); // flutterに合わせてrepositoryでJsonをstateのデータ型に変換
      return weather;
    } else {
      throw new HttpException(response.statusText, String(response.status), 'open-weather-api');
    }
  };

  // 以下はあれば記載
  // POST
  // DELETE　・・・
}
