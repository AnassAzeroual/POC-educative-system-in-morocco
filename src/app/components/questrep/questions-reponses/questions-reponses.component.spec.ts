import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsReponsesComponent } from './questions-reponses.component';

describe('QuestionsReponsesComponent', () => {
  let component: QuestionsReponsesComponent;
  let fixture: ComponentFixture<QuestionsReponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsReponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsReponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
