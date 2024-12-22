import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  keyword: string = "";
  constructor(private router: Router, private ds:MyDataService) {}

  async openCountries() {
    await this.ds.set("kw", this.keyword);
    this.router.navigate(['/countries'])
  }
}
