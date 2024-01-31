import { capitalize } from 'common/utils/capitalize/capitalize';
import { alph } from 'common/utils/constants/constants';
import { ValidateException } from 'common/utils/error/commonExceptions';
import { type CurrentWeather } from 'entities/weather/CurrentWeather';

export interface WeatherRepository {
  getWeather: (city: string) => Promise<CurrentWeather>;
}

/**
 * UseCaseのInterfaceは定義していない。理由は以下の通り。
 * PresenterがUsecCaseに依存する点は問題ないため。
 * Presenterのテスト時にUsecCaseをモック化するが、Interfaceがなくても不都合はないため。
 */
export class WeatherUseCase {
  private readonly weatherRepository: WeatherRepository;
  constructor(weatherRepository: WeatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  public getWeather = async (city: string): Promise<CurrentWeather> => {
    // 入力値チェック
    const { isSucceed, capitalizedCity } = validateParams(city);
    if (!isSucceed) {
      throw new ValidateException('city name is not alphabet', 'invalid-city-name');
    }

    // repository呼び出し
    const weatherModel = await this.weatherRepository.getWeather(capitalizedCity);
    return weatherModel;
  };
}

export const validateParams = (city: string) => {
  if (!alph.test(city)) {
    return { isSucceed: false, capitalizedCity: '' };
  } else {
    const capitalizedCity = capitalize(city);
    return { isSucceed: true, capitalizedCity: capitalizedCity };
  }
};
