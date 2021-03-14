import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { WeatherApi } from '../shared/types/weather-api';
import { weatherApi } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class ForecastService {
  private forecastParams = {
    cnt: '7',
    lang: 'en',
    APPID: weatherApi.key,
  }
  constructor(private http: HttpClient) { }

  public forecast(city: string, date: Date) {
    const params = new HttpParams({ fromObject: { ...this.forecastParams, q: city, dt: date.toString() } });
    return this.http
      .get<WeatherApi>(`${weatherApi.url}/weather?`, {
        params,
      })
      .pipe(
        map((response) => ({
          weather: response.weather[0].icon
        }))
      );
  }

}