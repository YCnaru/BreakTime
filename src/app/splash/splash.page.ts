import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone'; 
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, CommonModule, FormsModule, RouterModule]
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  irAlHome() {
    console.log('Navegando de forma limpia a las pestañas...');
    this.router.navigateByUrl('/tabs/tab1');
  }

}