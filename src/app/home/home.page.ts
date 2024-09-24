import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRippleEffect,
  IonPopover,
  IonButton,
  IonIcon,
  IonToggle,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { SwiperProjectsComponent } from '../swiper-projects/swiper-projects.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonToggle,
    IonIcon,
    IonButton,
    IonPopover,
    IonRippleEffect,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    AvatarComponent,
    CommonModule,
    SwiperProjectsComponent,
  ],
})
export class HomePage implements AfterViewInit {
  @ViewChild(IonContent, { static: true, read: ElementRef })
  ionContent!: ElementRef;

  private isMouseDown = false;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private projectList: HTMLElement | null = null;
  private iframes: HTMLIFrameElement[] = [];
  private tempDivs: HTMLDivElement[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.projectList = this.el.nativeElement.querySelector('.project__list');
    if (this.projectList) {
      this.projectList.style.cursor = 'grab';
      this.projectList.style.userSelect = 'none';
      this.iframes = Array.from(
        this.projectList.getElementsByTagName('iframe')
      );
    }
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const contentElement: HTMLElement = this.ionContent.nativeElement;
    const rect = contentElement.getBoundingClientRect();
    const contentX = event.clientX - rect.left;
    const contentY = event.clientY - rect.top;
    setTimeout(() => {
      contentElement.style.setProperty('--x', `${contentX}px`);
      contentElement.style.setProperty('--y', `${contentY}px`);
    }, 100);
  }

  isMeteorsActive: boolean = true;
  isSocialMediaActive: boolean = false;
  isProjectActive: boolean = false;

  toggleMeteors(event: Event): void {
    this.isMeteorsActive = !this.isMeteorsActive;
  }

  toggleSocialMedia(event: Event): void {
    this.isSocialMediaActive = !this.isSocialMediaActive;
  }

  toggleProject(event: Event): void {
    this.isProjectActive = !this.isProjectActive;
  }
}
