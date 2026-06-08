import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
// 1. IMPORTAMOS los tres iconos exactos que quieres usar
import { homeOutline, barbellOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    // 2. REGISTRAMOS los iconos vinculando el nombre del HTML con la importación
    addIcons({ 
      'home-icon': homeOutline, 
      'rutinas-icon': barbellOutline, 
      'ajustes-icon': settingsOutline 
    });
  }
}