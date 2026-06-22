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

  constructor(
    private configuracion: Configuracion
  ) {}

  ngOnInit() {
    this.cargarConfiguracion();
  }

  // ionViewWillEnter() {
  //   this.cargarConfiguracion();
  // }

  tiempoPorDefecto: number = 45 * 60;
  tiempoTotal: number = 45 * 60;

  timerId: any = null;
  enEjecucion: boolean = false;

  minutosPantalla: string = '45';
  segundosPantalla: string = '00';

  cargarConfiguracion() {

    const minutos =
      this.configuracion.getIntervalo();

    this.tiempoPorDefecto = minutos * 60;

    this.tiempoTotal = this.tiempoPorDefecto;

    this.actualizarPantalla();
  }

/**
 * Inicia el contador regresivo.
 */
iniciarTimer() {

    if (this.enEjecucion) {
      return;
    }

    this.enEjecucion = true;

    this.timerId = setInterval(() => {

      // Mientras quede tiempo
      if (this.tiempoTotal > 0) {

        this.tiempoTotal--;

        this.actualizarPantalla();

        // Si llegó exactamente a cero
        if (this.tiempoTotal === 0) {

          clearInterval(this.timerId);

          this.timerTerminado();
        }

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

    let valor = String(event.detail.value ?? '');

    if (valor.length > 2) {
      valor = valor.substring(0, 2);
    }

    let minutos = Number(valor);

    if (isNaN(minutos)) return;

    minutos = Math.max(0, minutos);

    const segundosActuales =
      this.tiempoTotal % 60;

    this.tiempoTotal =
      (minutos * 60) + segundosActuales;

    this.tiempoPorDefecto = this.tiempoTotal;

    this.actualizarPantalla();
  }

  cambiarSegundos(event: any) {
    let valor = String(event.detail.value ?? '');

    if (valor.length > 2) {
      valor = valor.substring(0, 2);
    }

    let segundos = Number(valor);

    if (isNaN(segundos)) return;

    segundos =
      Math.max(0, Math.min(59, segundos));

    const minutosActuales =
      Math.floor(this.tiempoTotal / 60);

    this.tiempoTotal =
      (minutosActuales * 60) + segundos;

    this.tiempoPorDefecto = this.tiempoTotal;

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
    // Asegura que nunca aparezcan valores negativos
    this.tiempoTotal = 0;
    this.actualizarPantalla();
    alert('¡BreakTime! Es hora de tu pausa activa.');
  }

}