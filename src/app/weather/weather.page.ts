import { Component, OnInit } from '@angular/core';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonicModule  
  ]
})
export class WeatherPage implements OnInit {

  country: any = {}; // To store country data
  capital: string = "";
  weatherData: any = {}; // To store weather data
  errorMessage: string = ''; // To display error message if data fails

  constructor(private ds: MyDataService, private mhs: MyHttpService) { }

  ngOnInit() {
    this.getCountryDetails();
  }

  // Get country details (latitude, longitude)
  async getCountryDetails() {
    this.country = await this.ds.get('countryName');
    const lat = await this.ds.get('latitude'); // Retrieve latitude
    const lon = await this.ds.get('longitude'); // Retrieve longitude
    this.capital = await this.ds.get('capital'); // Retrieve capital

    //Visual in the console, in case of error
    if (!this.country || !lat || !lon) {
      console.error('No country or location data found');
      this.errorMessage = 'Country or location data not found.';
      return;
    }

    this.getWeatherData(lat, lon); // Gets the weather data using the latitude and longitude
  }

  // Get weather data from OpenWeatherMap API
  async getWeatherData(lat: number, lon: number) {
    const apiKey = '1118ac40e976501c4df86e28f58acede'; // My API key
    const units = 'metric'; // Used 'metric' for Celsius
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    console.log(url);
    try {
      const response: any = await this.mhs.get({ url });

      if (response && response.data) {
        this.weatherData = response.data;
      } else {
        this.errorMessage = 'No weather data available.';
      }
    } catch (error) {
      console.error('Error fetching weather data', error);
      this.errorMessage = 'Unable to retrieve weather data.';
    }
  }
}
