import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaggeredComponent } from './staggered.component';

describe('StaggeredComponent', () => {
  let component: StaggeredComponent;
  let fixture: ComponentFixture<StaggeredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaggeredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaggeredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
