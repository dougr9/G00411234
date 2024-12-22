import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {

  keyword: string= "";
  countryInfo!: any;

  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/name/"
  }

  constructor(private ds:MyDataService, private mhs:MyHttpService, private router: Router) { }

  ngOnInit() {
    this.getKw();
  }

  async getKw() {
    this.keyword = await this.ds.get('kw');
    this.options.url = this.options.url.concat(this.keyword);
    let result = await this.mhs.get(this.options);
    this.countryInfo = result.data;
    console.log(JSON.stringify(this.countryInfo));
  }

  async openNews() {
      this.router.navigate(['/news'])
  }

  async openWeather() {
    this.router.navigate(['/weather'])
}

}
