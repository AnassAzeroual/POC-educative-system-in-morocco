import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonHomeComponent } from './bouton-home.component';

describe('BoutonHomeComponent', () => {
  let component: BoutonHomeComponent;
  let fixture: ComponentFixture<BoutonHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutonHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
