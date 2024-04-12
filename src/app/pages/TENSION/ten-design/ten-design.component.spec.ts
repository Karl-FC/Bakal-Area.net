import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenDesignComponent } from './ten-design.component';

describe('TenDesignComponent', () => {
  let component: TenDesignComponent;
  let fixture: ComponentFixture<TenDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenDesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
