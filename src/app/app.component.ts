import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonItem, IonMenu, IonHeader, IonToolbar, IonContent, IonLabel, IonTitle, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonList, IonTitle, IonLabel, IonContent, IonToolbar, IonHeader, IonItem, IonApp, IonRouterOutlet, IonMenu],
})
export class AppComponent {
  constructor() {}
}
