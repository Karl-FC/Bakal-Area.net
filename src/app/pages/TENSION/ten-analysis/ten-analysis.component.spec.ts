import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenAnalysisComponent } from './ten-analysis.component';

describe('TenAnalysisComponent', () => {
  let component: TenAnalysisComponent;
  let fixture: ComponentFixture<TenAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
