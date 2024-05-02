import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShearDesignloadsComponent } from './shear-designloads.component';

describe('ShearDesignloadsComponent', () => {
  let component: ShearDesignloadsComponent;
  let fixture: ComponentFixture<ShearDesignloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShearDesignloadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShearDesignloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
