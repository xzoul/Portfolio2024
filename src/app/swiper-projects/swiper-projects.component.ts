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

  swiperConfig = {
    modules: [Grid, Pagination, Navigation],
    grid: {
      rows: 1,
      fill: 'row',
    },
    slidesPerView: 1,

    breakpoints: {

      320: {
        centeredSlides: false,
        slidesPerView: 'auto',

      },
      768: {
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    },
  };

  initSwiper() {
    this.swiper = new Swiper('.swiper', {
      modules: [Grid, Pagination, Navigation],
      grid: {
        rows: 1,
        fill: 'row',
      },
      slidesPerView: 1,
      // centeredSlides: true,
      // slidesPerView: 3,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },

      breakpoints: {
        // When window width is >= 320px
        320: {
          centeredSlides: false,
          slidesPerView: 'auto',
          // slidesPerView: 1,
          // spaceBetween: 40,
        },
        // // When window width is >= 480px
        // 480: {
        //   slidesPerView: 2,
        //   spaceBetween: 20,
        // },
        // // When window width is >= 640px
        // 640: {
        //   slidesPerView: 3,
        //   spaceBetween: 30,
        // },
        // When window width is >= 1024px
        768: {
          centeredSlides: true,
          // slidesPerView: 3,
          slidesPerView: 'auto',
          spaceBetween: 32,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      },
    });
  }

  isProjectActive: boolean[] = Array(5).fill(false);

  toggleProject(index: number): void {
    this.isProjectActive[index] = !this.isProjectActive[index];
  }
}
