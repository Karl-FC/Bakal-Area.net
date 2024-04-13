import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamshapesComponent } from './beamshapes.component';

describe('BeamshapesComponent', () => {
  let component: BeamshapesComponent;
  let fixture: ComponentFixture<BeamshapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeamshapesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeamshapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
