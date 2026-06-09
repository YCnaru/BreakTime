import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { Configuracion } from '../services/configuracion';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    CommonModule
  ],
})

export class Tab1Page implements OnInit{

  ngOnInit() {
    this.cargarConfiguracion();
  }

  tiempoPorDefecto: number = 45 * 60;
  tiempoTotal: number = 45 * 60;

  timerId: any = null;
  enEjecucion: boolean = false;

  minutosPantalla: string = '45';
  segundosPantalla: string = '00';

  constructor(
    private configuracion: Configuracion
  ) {
    this.cargarConfiguracion();
  }

  ionViewWillEnter() {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {

    const minutos =
      this.configuracion.getIntervalo();

    this.tiempoPorDefecto = minutos * 60;

    this.tiempoTotal = this.tiempoPorDefecto;

    this.actualizarPantalla();
  }

  iniciarTimer() {

    if (this.enEjecucion) return;
    this.enEjecucion = true;
    this.timerId = setInterval(() => {
      if (this.tiempoTotal > 0) {
        this.tiempoTotal--;
        this.actualizarPantalla();
      } else {
        this.tiempoTotal = 0;
        this.actualizarPantalla();
        this.timerTerminado();
      }
    }, 1000);
  }

  pausarTimer() {
    this.enEjecucion = false;
    clearInterval(this.timerId);
  }

  reiniciarTimer() {
    this.enEjecucion = false;
    clearInterval(this.timerId);
    const minutos =
      this.configuracion.getIntervalo();
    this.tiempoPorDefecto = minutos * 60;
    this.tiempoTotal = this.tiempoPorDefecto;
    this.actualizarPantalla();
  }

  cambiarMinutos(event: any) {
    let minutos = Number(event.detail.value);

    if (isNaN(minutos)) return;

    minutos = Math.max(0, minutos);

    const segundosActuales =
      this.tiempoTotal % 60;

    this.tiempoTotal =
      (minutos * 60) + segundosActuales;

    if (this.tiempoTotal < 2) {
      this.tiempoTotal =
        this.configuracion.getIntervalo() * 60;
    }

    this.actualizarPantalla();
  }

  cambiarSegundos(event: any) {
    let segundos = Number(event.detail.value);
    if (isNaN(segundos)) return;

    segundos =
      Math.max(0, Math.min(59, segundos));

    const minutosActuales =
      Math.floor(this.tiempoTotal / 60);

    this.tiempoTotal =
      (minutosActuales * 60) + segundos;

    if (this.tiempoTotal < 2) {

    this.tiempoTotal =
      this.configuracion.getIntervalo() * 60;
    }

    this.actualizarPantalla();
  }

  actualizarPantalla() {

    const mins =
      Math.floor(this.tiempoTotal / 60);

    const segs =
      this.tiempoTotal % 60;

    this.minutosPantalla =
      mins < 10
        ? '0' + mins
        : mins.toString();

    this.segundosPantalla =
      segs < 10
        ? '0' + segs
        : segs.toString();
  }

  timerTerminado() {
    this.pausarTimer();
    alert('¡BreakTime! Es hora de tu pausa activa.');
  }

}