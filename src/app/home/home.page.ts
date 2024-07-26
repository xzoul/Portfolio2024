import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, AvatarComponent],
})
export class HomePage {
  // @ViewChild('mainElement') mainEl!: ElementRef;
  @ViewChild(IonContent, { static: true, read: ElementRef })
  ionContent!: ElementRef;

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const contentElement: HTMLElement = this.ionContent.nativeElement;

    // Get the bounding client rect
    const rect = contentElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setTimeout(() => {
      contentElement.style.setProperty('--x', `${x}px`);
      contentElement.style.setProperty('--y', `${y}px`);
    }, 100);

    // const rect = this.mainEl.nativeElement.getBoundingClientRect();
    // const sections = this.el.nativeElement.querySelectorAll('section');
    // sections.forEach((element: any) => {
    //   setTimeout(() => {
    //     element.nativeElement.style.setProperty('--x', `${x}px`);
    //     element.nativeElement.style.setProperty('--y', `${y}px`);
    //   }, 100);
    // });

    // console.log(contentElement.style);
  }
}
