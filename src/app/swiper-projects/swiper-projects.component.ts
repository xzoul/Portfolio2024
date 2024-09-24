import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Grid, Pagination, Navigation } from 'swiper/modules';

@Component({
  selector: 'app-swiper-projects',
  templateUrl: './swiper-projects.component.html',
  styleUrls: ['./swiper-projects.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SwiperProjectsComponent implements OnInit {
  swiper: Swiper | undefined;

  ngOnInit() {
    this.initSwiper();
  }

  initSwiper() {
    // this.swiper = new Swiper('.swiper', {
    //   modules: [Pagination, Navigation],
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    //   slidesPerView: 4,
    //   spaceBetween: 30,
    //   centeredSlides: true,
    // });

    this.swiper = new Swiper('.swiper', {
      modules: [Grid, Pagination, Navigation],
      grid: {
        rows: 1,
        fill: 'row',
      },
      centeredSlides: true,
      slidesPerView: 3,
      spaceBetween: 50,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  isProjectActive: boolean[] = Array(5).fill(false);

  toggleProject(index: number): void {
    this.isProjectActive[index] = !this.isProjectActive[index];
  }
}
