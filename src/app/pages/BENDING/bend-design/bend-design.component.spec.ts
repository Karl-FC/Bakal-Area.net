import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BendDesignComponent } from './bend-design.component';

describe('BendDesignComponent', () => {
  let component: BendDesignComponent;
  let fixture: ComponentFixture<BendDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BendDesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BendDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
