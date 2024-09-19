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

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.projectList) return;

    this.isMouseDown = true;
    this.startX = event.pageX - this.projectList.offsetLeft;
    this.scrollLeft = this.projectList.scrollLeft;
    this.projectList.style.cursor = 'grabbing';
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (!this.projectList) return;

    this.isMouseDown = false;
    this.isDragging = false;
    this.projectList.style.cursor = 'grab';
    this.enableIframes();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.projectList) return;

    if (this.isMouseDown) {
      const x = event.pageX - this.projectList.offsetLeft;
      const walk = (x - this.startX) * 2;

      // Only start dragging if the mouse has moved a significant amount
      if (!this.isDragging && Math.abs(walk) > 5) {
        this.isDragging = true;
        this.disableIframes();
      }

      if (this.isDragging) {
        this.projectList.scrollLeft = this.scrollLeft - walk;
        event.preventDefault(); // Prevent text selection only when actually dragging
      }
    }

    // Only update hover effect if not dragging
    if (!this.isDragging) {
      this.updateHoverEffect(event);
    }
  }

  private updateHoverEffect(event: MouseEvent) {
    const contentElement: HTMLElement = this.ionContent.nativeElement;
    const rect = contentElement.getBoundingClientRect();
    const contentX = event.clientX - rect.left;
    const contentY = event.clientY - rect.top;
    contentElement.style.setProperty('--x', `${contentX}px`);
    contentElement.style.setProperty('--y', `${contentY}px`);
  }

  private disableIframes() {
    this.iframes.forEach((iframe) => {
      const tempDiv = this.renderer.createElement('div');
      this.renderer.setStyle(tempDiv, 'position', 'absolute');
      this.renderer.setStyle(tempDiv, 'top', '0');
      this.renderer.setStyle(tempDiv, 'left', '0');
      this.renderer.setStyle(tempDiv, 'width', '100%');
      this.renderer.setStyle(tempDiv, 'height', '100%');
      this.renderer.setStyle(tempDiv, 'z-index', '10000');
      this.renderer.appendChild(iframe.parentNode, tempDiv);
      this.tempDivs.push(tempDiv);
    });
  }

  private enableIframes() {
    this.tempDivs.forEach((div) => {
      if (div.parentNode) {
        this.renderer.removeChild(div.parentNode, div);
      }
    });
    this.tempDivs = [];
  }

  isActive: boolean = true;

  toggleClass(event: Event): void {
    this.isActive = !this.isActive;
  }
}
