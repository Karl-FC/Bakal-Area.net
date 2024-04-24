import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenddesignLoadsComponent } from './benddesign-loads.component';

describe('BenddesignLoadsComponent', () => {
  let component: BenddesignLoadsComponent;
  let fixture: ComponentFixture<BenddesignLoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenddesignLoadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenddesignLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
