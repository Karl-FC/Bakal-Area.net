<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressionComponent } from './compression.component';

describe('CompressionComponent', () => {
  let component: CompressionComponent;
  let fixture: ComponentFixture<CompressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompressionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressionComponent } from './compression.component';

describe('CompressionComponent', () => {
  let component: CompressionComponent;
  let fixture: ComponentFixture<CompressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompressionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> fa38da51d8686245a1bbb2f9dda78a0dbfbfb915
