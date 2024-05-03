import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendesignTableComponent } from './tendesign-table.component';

describe('TendesignTableComponent', () => {
  let component: TendesignTableComponent;
  let fixture: ComponentFixture<TendesignTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TendesignTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TendesignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
