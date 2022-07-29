import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import {WelcomeComponent} from './welcome/welcome.component';
export const allAppRoutes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: '', component: WelcomeComponent }
];
