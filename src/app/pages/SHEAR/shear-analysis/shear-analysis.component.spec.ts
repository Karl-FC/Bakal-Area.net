import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShearAnalysisComponent } from './shear-analysis.component';

describe('ShearAnalysisComponent', () => {
  let component: ShearAnalysisComponent;
  let fixture: ComponentFixture<ShearAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShearAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShearAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
