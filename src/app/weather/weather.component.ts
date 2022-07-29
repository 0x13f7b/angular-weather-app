import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WeatherService} from '../weather.service';
import _ from 'lodash';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public metric: 'c';
  public metrics: Array<String>;
  private startCase: any = _.startCase;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) {
  }

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
    this.metric = 'c';
    this.metrics = ['c', 'f'];
    localStorage.setItem('topLocations', JSON.stringify([]));
  }

  sendFormData(formValues) {
    this.weatherService.getWeather(formValues.location).subscribe(data => {
      this.weatherData = data;
      console.log(JSON.stringify(this.weatherData));
      console.log(formValues.location);
      this.addLocation(formValues.location);
      console.log(this.getLocations());
    });


  }

  getLocations() {
    return JSON.parse(localStorage.getItem('topLocations'));
  }

  addLocation(location: string) {
    const locations = this.getLocations();
    if (!locations.includes(location.toLowerCase())) {
      locations.push(location.toLowerCase());
    }
    localStorage.setItem('topLocations', JSON.stringify(locations));
  }

  onMetricChange(value: any) {
    this.metric = value;
  }

  computeTemperature(value: any) {
    if (this.metric === 'c') {
      return value;
    }
    return value * 9 / 5 + 32;
  }
}
