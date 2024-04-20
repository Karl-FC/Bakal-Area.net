import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompdesignLoadsComponent } from './compdesign-loads.component';

describe('CompdesignLoadsComponent', () => {
  let component: CompdesignLoadsComponent;
  let fixture: ComponentFixture<CompdesignLoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompdesignLoadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompdesignLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
