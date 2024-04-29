import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShearlagComponent } from './shearlag.component';

describe('ShearlagComponent', () => {
  let component: ShearlagComponent;
  let fixture: ComponentFixture<ShearlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShearlagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShearlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
