import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, CommonModule],
})
export class Tab1Page {

  tiempoTotal: number = 45 * 60; 
  timerId: any = null;
  enEjecucion: boolean = false;

  minutosPantalla: string = '45';
  segundosPantalla: string = '00';

  constructor() {
    this.actualizarPantalla();
  }

  cambiarMinutos(event: any) {
    const nuevosMinutos = parseInt(event.detail.value, 10);
    
    if (!isNaN(nuevosMinutos) && nuevosMinutos > 0) {
      this.tiempoTotal = nuevosMinutos * 60;
      this.actualizarPantalla();
    }
  }

  iniciarTimer() {
    if (this.enEjecucion) return;
    this.enEjecucion = true;
    
    this.timerId = setInterval(() => {
      if (this.tiempoTotal > 0) {
        this.tiempoTotal--;
        this.actualizarPantalla();
      } else {
        this.timerTerminado();
      }
    }, 1000);
  }

  pausarTimer() {
    this.enEjecucion = false;
    clearInterval(this.timerId);
  }

  actualizarPantalla() {
    const mins = Math.floor(this.tiempoTotal / 60);
    const segs = this.tiempoTotal % 60;
    this.minutosPantalla = mins < 10 ? '0' + mins : mins.toString();
    this.segundosPantalla = segs < 10 ? '0' + segs : segs.toString();
  }

  timerTerminado() {
    this.pausarTimer();
    alert('¡BreakTime! Es hora de tu pausa activa.');
  }
}