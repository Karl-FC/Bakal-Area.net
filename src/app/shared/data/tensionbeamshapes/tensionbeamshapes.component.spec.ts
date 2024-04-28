import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TensionbeamshapesComponent } from './tensionbeamshapes.component';

describe('TensionbeamshapesComponent', () => {
  let component: TensionbeamshapesComponent;
  let fixture: ComponentFixture<TensionbeamshapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TensionbeamshapesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TensionbeamshapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
