import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TensionInputsComponent } from './tension-inputs.component';

describe('TensionInputsComponent', () => {
  let component: TensionInputsComponent;
  let fixture: ComponentFixture<TensionInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TensionInputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TensionInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
