import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwiperProjectsComponent } from './swiper-projects.component';

describe('SwiperProjectsComponent', () => {
  let component: SwiperProjectsComponent;
  let fixture: ComponentFixture<SwiperProjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SwiperProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwiperProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
