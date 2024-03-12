import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnalesMatiereDetailsComponent } from './annales-matiere-details.component';

describe('AnnalesMatiereDetailsComponent', () => {
  let component: AnnalesMatiereDetailsComponent;
  let fixture: ComponentFixture<AnnalesMatiereDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnalesMatiereDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnalesMatiereDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
