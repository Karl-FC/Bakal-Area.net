import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheardesignTableComponent } from './sheardesign-table.component';

describe('SheardesignTableComponent', () => {
  let component: SheardesignTableComponent;
  let fixture: ComponentFixture<SheardesignTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheardesignTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheardesignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
