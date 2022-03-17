import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  public weatherInfos: any;

  constructor() {}

  ngOnInit(): void {
    this.weatherInfos = {
      main: {},
      isDaytime: true,
    };
    this.callWeatherInfos();
  }

  callWeatherInfos(): void {
    fetch('SECRET')
      .then((response) => response.json())
      .then((weatherInfo) => {
        this.setWeatherInfos(weatherInfo);
      });
  }

  setWeatherInfos(weatherInfo: any) {
    this.weatherInfos = weatherInfo;
    const sundownTime = new Date(this.weatherInfos.sys.sunset * 1000);
    this.weatherInfos.sunset_time = sundownTime.toLocaleTimeString();
    const absoluteZero: number = 273.15;

    const currentTime = new Date();
    this.weatherInfos.isDaytime = currentTime.getTime() < sundownTime.getTime();
    this.weatherInfos.tempInCelsius = (
      this.weatherInfos.main.temp - absoluteZero
    ).toFixed(0);
    this.weatherInfos.minTemp = (
      this.weatherInfos.main.temp_min - absoluteZero
    ).toFixed(0);
    this.weatherInfos.maxTemp = (
      this.weatherInfos.main.temp_max - absoluteZero
    ).toFixed(0);
    this.weatherInfos.feelLikeTemp = (
      this.weatherInfos.main.feels_like - absoluteZero
    ).toFixed(0);
  }
}
