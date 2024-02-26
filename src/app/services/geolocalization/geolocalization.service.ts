import { City } from './../../models/city.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizationService {
  private baseUrl = 'http://api.openweathermap.org/geo/1.0';

  constructor(private httpClient: HttpClient) { }

  public getByCityName(cityName: string): Observable<City> {
    var url = `${this.baseUrl}/direct?q=${cityName}&appid=${environment.weatherapi.id}`
    return this.httpClient.get<any>(url)
      .pipe(map((resp => <City>{
        name: resp[0].name,
        latitude: resp[0].lat,
        longitude: resp[0].lon,
      })));
  }
}
