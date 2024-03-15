import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExPazapaComponent } from './ex-pazapa.component';

describe('ExPazapaComponent', () => {
  let component: ExPazapaComponent;
  let fixture: ComponentFixture<ExPazapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ExPazapaComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExPazapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
