import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component'; // Ensure path is correct

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    AvatarComponent,
    CommonModule,
  ], // Add AvatarComponent here
})
export class HomePage {
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
  }
}
