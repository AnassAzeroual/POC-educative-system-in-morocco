import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoQuizComponent } from './info-quiz.component';

describe('InfoQuizComponent', () => {
  let component: InfoQuizComponent;
  let fixture: ComponentFixture<InfoQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
