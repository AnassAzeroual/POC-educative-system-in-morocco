import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnalesDisplayComponent } from './annales-display.component';

describe('AnnalesDisplayComponent', () => {
  let component: AnnalesDisplayComponent;
  let fixture: ComponentFixture<AnnalesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnalesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnalesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
