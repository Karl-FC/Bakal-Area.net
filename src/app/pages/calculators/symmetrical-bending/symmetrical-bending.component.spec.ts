import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymmetricalBendingComponent } from './symmetrical-bending.component';

describe('SymmetricalBendingComponent', () => {
  let component: SymmetricalBendingComponent;
  let fixture: ComponentFixture<SymmetricalBendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymmetricalBendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SymmetricalBendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
