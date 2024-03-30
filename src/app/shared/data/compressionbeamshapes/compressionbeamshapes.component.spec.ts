import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressionbeamshapesComponent } from './compressionbeamshapes.component';

describe('CompressionbeamshapesComponent', () => {
  let component: CompressionbeamshapesComponent;
  let fixture: ComponentFixture<CompressionbeamshapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompressionbeamshapesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompressionbeamshapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
