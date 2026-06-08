// src/app/tab3/tab3.page.ts
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption, FormsModule]
})
export class Tab3Page {
  vibracion: boolean = true;
  sonido: boolean = true;
  modoOscuro: boolean = false;
  intervalo: string = '45';

  constructor() {}

  cambiarModo() {
  const body = document.body;
  
  if (this.modoOscuro) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}}