import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShearDesignComponent } from './shear-design.component';

describe('ShearDesignComponent', () => {
  let component: ShearDesignComponent;
  let fixture: ComponentFixture<ShearDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShearDesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShearDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
