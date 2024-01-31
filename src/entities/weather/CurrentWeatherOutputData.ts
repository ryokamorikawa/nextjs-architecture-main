import { type CurrentWeather } from './CurrentWeather';
/// Derived model class used in the UI

export class CurrentWeatherOutputData {
  name: string | undefined;
  icon: string | undefined;
  main: string | undefined;
  temp: string | undefined;
  feels_like: string | undefined;
  humidity: number | undefined;
  wind_speed: string | undefined;

  constructor(
    _name: string | undefined,
    _icon: string | undefined,
    _main: string | undefined,
    _temp: string | undefined,
    _feels_like: string | undefined,
    _humidity: number | undefined,
    _wind_speed: string | undefined
  ) {
    this.name = _name;
    this.icon = _icon;
    this.main = _main;
    this.temp = _temp;
    this.feels_like = _feels_like;
    this.humidity = _humidity;
    this.wind_speed = _wind_speed;
  }

  // staticはインスタンス化せずに使えるようになる
  public static toCurrentWeatherOutputData(weather: CurrentWeather): CurrentWeatherOutputData {
    return new CurrentWeatherOutputData(
      weather.name,
      weather.weather && weather.weather[0] ? weather.weather[0].icon : '',
      weather.weather && weather.weather[0] ? weather.weather[0].main : '',
      weather.main && weather.main.temp ? weather.main.temp.toFixed(0) : '',
      weather.main && weather.main.feels_like ? weather.main.feels_like.toFixed(0) : '',
      weather.main && weather.main.humidity ? weather.main.humidity : undefined,
      weather.wind && weather.wind.speed ? weather.wind.speed.toFixed(0) : ''
    );
  }
}
