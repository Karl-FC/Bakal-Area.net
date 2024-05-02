import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxmomentsComponent } from './maxmoments.component';

describe('MaxmomentsComponent', () => {
  let component: MaxmomentsComponent;
  let fixture: ComponentFixture<MaxmomentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxmomentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaxmomentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
