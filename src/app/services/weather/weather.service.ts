import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather } from 'src/app/models/weather.model';
import { City } from 'src/app/models/city.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private httpClient: HttpClient) { }

  public getCurrent(city: City): Observable<Weather> {
    var url = `${this.baseUrl}/weather?lat=${city.latitude}&lon=${city.longitude}&units=${environment.weatherapi.units}&lang=${environment.weatherapi.lang}&appid=${environment.weatherapi.id}`
    return this.httpClient.get<any>(url)
      .pipe(map((resp => <Weather>{
        name: resp.name,
        date: new Date(resp.dt * 1000),
        description: resp.weather[0].description,
        temp: resp.main.temp,
        feelsLike: resp.main.feels_like,
        tempMin: resp.main.temp_min,
        tempMax: resp.main.temp_max,
        pressure: resp.main.pressure,
        humidity: resp.main.humidity
      })));
  }
}
