import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocMatiereComponent } from './bloc-matiere.component';

describe('BlocMatiereComponent', () => {
  let component: BlocMatiereComponent;
  let fixture: ComponentFixture<BlocMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
