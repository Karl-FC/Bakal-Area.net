import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BendAnalysisComponent } from './bend-analysis.component';

describe('BendAnalysisComponent', () => {
  let component: BendAnalysisComponent;
  let fixture: ComponentFixture<BendAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BendAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BendAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
