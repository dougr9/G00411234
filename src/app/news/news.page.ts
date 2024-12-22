import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class NewsPage implements OnInit {

  keyword: string = "";
  countryName: string = ""; // To store the country name
  newsList: any[] = [];
  noNewsMessage: string = '';

  options: HttpOptions = {
    url: "https://newsdata.io/api/1/latest"
  }

  apiKey = "pub_63038bbf556cb0bb51591b9e592d8e6c2ecd0"; // My API key from newsdata.io

  constructor(
    private ds: MyDataService,
    private mhs: MyHttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCountryAndFetchNews();
  }

  async getCountryAndFetchNews() {
    // Retrieve the country cca2 code and country name from local storage
    const cca2 = await this.ds.get('countryCca2');
    const country = await this.ds.get('countryName'); // Get the full country name
    this.countryName = country; // Store country name to be shown in the country news page

    // Fetch the news for the country using the cca2 code
    this.fetchNews(cca2);
  }

  async fetchNews(countryCode: string) {
   
    const url = `${this.options.url}?apikey=${this.apiKey}&country=${countryCode}`;
    // https://newsdata.io/api/1/latest?apikey=YOUR_API_KEY&country=COUNTRY_CCA2_CODE

    try { // I was getting errors. Code VS suggested wrapping with a Try/Catch, and worked.

      const response: any = await this.mhs.get({ url });

      if (response.data && response.data.results && response.data.results.length > 0) {
        // This is to check if there is news for the country
        this.newsList = response.data.results;
        this.noNewsMessage = '';
      } else {
        // If no news found, set the no news message
        this.noNewsMessage = `No news found for ${this.countryName}`;
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      this.noNewsMessage = `No news found for ${this.countryName}`;
    }
  }
}
