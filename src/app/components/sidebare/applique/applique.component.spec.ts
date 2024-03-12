import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliqueComponent } from './applique.component';

describe('AppliqueComponent', () => {
  let component: AppliqueComponent;
  let fixture: ComponentFixture<AppliqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
