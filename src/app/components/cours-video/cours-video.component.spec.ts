import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursVideoComponent } from './cours-video.component';

describe('CoursVideoComponent', () => {
  let component: CoursVideoComponent;
  let fixture: ComponentFixture<CoursVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
