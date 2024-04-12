import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TensiondesignComponent } from './tensiondesign.component';

describe('TensiondesignComponent', () => {
  let component: TensiondesignComponent;
  let fixture: ComponentFixture<TensiondesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TensiondesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TensiondesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
