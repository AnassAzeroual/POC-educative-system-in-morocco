import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoursComponent } from './parcours.component';

describe('ParcoursComponent', () => {
  let component: ParcoursComponent;
  let fixture: ComponentFixture<ParcoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ParcoursComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
