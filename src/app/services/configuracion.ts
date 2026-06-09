import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Configuracion {
    intervalo: number = 45;
    constructor() { }

    setIntervalo(valor: number) {
      this.intervalo = valor;
    }

    getIntervalo(): number {
      return this.intervalo;
    }
  
}
