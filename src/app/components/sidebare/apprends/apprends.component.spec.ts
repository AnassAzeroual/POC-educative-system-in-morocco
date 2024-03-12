import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprendsComponent } from './apprends.component';

describe('ApprendsComponent', () => {
  let component: ApprendsComponent;
  let fixture: ComponentFixture<ApprendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
