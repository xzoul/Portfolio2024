import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  Renderer2,
  RendererFactory2,
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
  private renderer: Renderer2;
  private defaultTheme: string = 'britanny';
  private currentTheme: string | null = null;

  constructor(
    private el: ElementRef,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      this.changeActiveTheme(savedTheme);
    } else {
      this.setDefaultTheme();
    }
  }

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
  isThemeCollapsed: boolean = false;

  toggleMeteors(event: Event): void {
    this.isMeteorsActive = !this.isMeteorsActive;
  }

  toggleSocialMedia(event: Event): void {
    this.isSocialMediaActive = !this.isSocialMediaActive;
  }

  toggleProject(event: Event): void {
    this.isProjectActive = !this.isProjectActive;
  }

  toggleTheme(event: Event): void {
    this.isThemeCollapsed = !this.isThemeCollapsed;
  }

  setDefaultTheme() {
    if (!this.currentTheme) {
      this.changeActiveTheme(this.defaultTheme);
    }
  }

  changeActiveTheme(theme: string): void {
    // Remove active class from previous theme
    if (this.currentTheme) {
      this.renderer.removeClass(document.documentElement, this.currentTheme);
      const prevActiveElement = document.querySelector(
        `.theme[data-theme="${this.currentTheme}"]`
      );
      if (prevActiveElement) {
        this.renderer.removeClass(prevActiveElement, 'active');
      }
    }

    // Add new theme class to root and active class to clicked element
    this.renderer.addClass(document.documentElement, theme);
    const newActiveElement = document.querySelector(
      `.theme[data-theme="${theme}"]`
    );
    if (newActiveElement) {
      this.renderer.addClass(newActiveElement, 'active');
    }

    this.currentTheme = theme;
    localStorage.setItem('selectedTheme', theme);
  }
}
