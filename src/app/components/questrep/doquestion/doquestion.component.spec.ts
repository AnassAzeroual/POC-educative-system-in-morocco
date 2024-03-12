import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoquestionComponent } from './doquestion.component';

describe('DoquestionComponent', () => {
  let component: DoquestionComponent;
  let fixture: ComponentFixture<DoquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
