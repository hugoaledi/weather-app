import { GeolocalizationService } from './../../services/geolocalization/geolocalization.service';
import { WeatherService } from './../../services/weather/weather.service';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Weather } from 'src/app/models/weather.model';
import { forkJoin, observable, Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  cities: Array<City> = [
    {
      name: 'Vitória',
      latitude: 0,
      longitude: 0
    },
    {
      name: 'Vila Velha',
      latitude: 0,
      longitude: 0
    },
    {
      name: 'Serra',
      latitude: 0,
      longitude: 0
    },
    {
      name: 'Cariacica',
      latitude: 0,
      longitude: 0
    },
  ];
  selectedCity?: City;
  weather?: Weather;

  constructor(
    private geolocalizationService: GeolocalizationService,
    private weatherService: WeatherService) { }

  ngOnInit(): void {
    var tasks: any[] = [];
    this.cities.forEach(async city => {
      tasks.push(this.geolocalizationService.getByCityName(city.name));
    });

    forkJoin(...tasks).subscribe((results: Array<City>) => {
      this.cities.forEach(city => {
        var info = results.find(x => x.name.toLocaleLowerCase() == city.name.toLocaleLowerCase());
        city.latitude = info?.latitude ?? 0;
        city.longitude = info?.longitude ?? 0;

        this.selectedCity = this.cities[0];
        this.loadWeather(this.selectedCity);
      });
    });
  }

  private loadWeather(city: City): void {
    this.weatherService.getCurrent(city)
      .subscribe(value => {
        this.weather = value;
      });
  }

  onChangeCity(): void {
    if (this.selectedCity) {
      this.loadWeather(this.selectedCity);
    }
  }
}
