import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexresultsComponent } from './flexresults.component';

describe('FlexresultsComponent', () => {
  let component: FlexresultsComponent;
  let fixture: ComponentFixture<FlexresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexresultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlexresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
