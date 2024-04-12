import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAnalysisComponent } from './comp-analysis.component';

describe('CompAnalysisComponent', () => {
  let component: CompAnalysisComponent;
  let fixture: ComponentFixture<CompAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
