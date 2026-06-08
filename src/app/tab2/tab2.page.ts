import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { eyeOutline, accessibilityOutline, personOutline, handLeftOutline, timerOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonList, IonItem, IonLabel, CommonModule]
})
export class Tab2Page {

  // Almacena cuál categoría está viendo el usuario
  categoriaActiva: string | null = null;
  tituloPantalla: string = 'Catálogo de Pausas';

  // Base de datos de los pasos para cada zona del cuerpo
  contenidoPausas: any = {
    ojos: {
      titulo: 'Relajación Visual 20-20-20',
      pasos: [
        { texto: '1. Mira a 20 pies (6 metros)', icon: 'ojo-icon' },
        { texto: '2. Durante 20 segundos', icon: 'reloj-icon' },
        { texto: '3. Repite cada 20 minutos', icon: 'repetir-icon' }
      ]
    },
    espalda: {
      titulo: 'Estiramiento de Espalda',
      pasos: [
        { texto: '1. Entrelaza tus manos y estira los brazos hacia el frente', icon: 'espalda-icon' },
        { texto: '2. Sostén la postura por 15 segundos', icon: 'reloj-icon' },
        { texto: '3. Repite inclinando suavemente el torso a los lados', icon: 'repetir-icon' }
      ]
    },
    cuello: {
      titulo: 'Alivio de Cuello',
      pasos: [
        { texto: '1. Gira la cabeza suavemente hacia el hombro derecho', icon: 'cuello-icon' },
        { texto: '2. Mantén la presión leve por 10 segundos de cada lado', icon: 'reloj-icon' },
        { texto: '3. Realiza 3 repeticiones por cada costado', icon: 'repetir-icon' }
      ]
    },
    manos: {
      titulo: 'Movilidad de Manos',
      pasos: [
        { texto: '1. Estira el brazo al frente y lleva los dedos hacia atrás', icon: 'manos-icon' },
        { texto: '2. Sostén el estiramiento por 15 segundos', icon: 'reloj-icon' },
        { texto: '3. Cambia de mano y repite 2 veces más', icon: 'repetir-icon' }
      ]
    }
  };

  constructor() {
    addIcons({
      'ojo-icon': eyeOutline,
      'espalda-icon': accessibilityOutline, 
      'cuello-icon': personOutline,         
      'manos-icon': handLeftOutline,
      'reloj-icon': timerOutline,
      'repetir-icon': refreshOutline
    });
  }

  // Al dar clic en un cuadro del catálogo
  seleccionarCategoria(zona: string) {
    this.categoriaActiva = zona;
    this.tituloPantalla = this.contenidoPausas[zona].titulo;
  }

  // Al dar clic en el botón "Finalizar"
  finalizarPausa() {
    this.categoriaActiva = null;
    this.tituloPantalla = 'Catálogo de Pausas';
  }
}