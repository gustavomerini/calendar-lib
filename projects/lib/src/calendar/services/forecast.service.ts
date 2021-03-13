import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'projects/showcase/src/environments/environment';
import { WeatherApi } from '../shared/types/weather-api';

@Injectable({ providedIn: 'root' })
export class ForecastService {
  private forecastParams = {
    cnt: '7',
    lang: 'en',
    APPID: environment.weatherApi.key,
  }
  constructor(private http: HttpClient) { }

  public forecast(city: string, date: string) {
    const params = new HttpParams({ fromObject: { ...this.forecastParams, q: city, dt: date } });
    return this.http
      .get<WeatherApi>(`${environment.weatherApi.url}/weather?`, {
        params,
      })
      .pipe(
        map((response) => ({
          weather: response.weather[0].icon,
          date: moment(date).format('MM/DD/YYYY'),
        }))
      );
  }

}