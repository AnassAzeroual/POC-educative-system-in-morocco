import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnalesComponent } from './annales.component';

describe('AnnalesComponent', () => {
  let component: AnnalesComponent;
  let fixture: ComponentFixture<AnnalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [AnnalesComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
