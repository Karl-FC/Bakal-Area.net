import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenddesignTableComponent } from './benddesign-table.component';

describe('BenddesignTableComponent', () => {
  let component: BenddesignTableComponent;
  let fixture: ComponentFixture<BenddesignTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenddesignTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenddesignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
