import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TensionRodsComponent } from './tension-rods.component';

describe('TensionRodsComponent', () => {
  let component: TensionRodsComponent;
  let fixture: ComponentFixture<TensionRodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TensionRodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TensionRodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
