import { Component, OnInit } from '@angular/core';
import { MyDataService } from '../services/my-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRadio, IonRadioGroup  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [FormsModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonRadio, IonRadioGroup],
  })
export class SettingsPage implements OnInit {
  
  unit: string = "metric"; // Default

  constructor(private ds: MyDataService) { }

  ngOnInit() {
    this.getUnit();
  }

  // Get the stored unit from local storage
  async getUnit() {
    const storedUnit = await this.ds.get('unit');
    if (storedUnit) {
      this.unit = storedUnit;
    } else {
      this.unit = "metric"; // Default
    }
  }

  // Set the unit in local storage
  async setUnit(event: any) {
    const selectedUnit = event.detail.value; // Get the selected value from the radio group
    await this.ds.set('unit', selectedUnit); // Store the selected unit in local storage
    console.log(selectedUnit);
  }
}
