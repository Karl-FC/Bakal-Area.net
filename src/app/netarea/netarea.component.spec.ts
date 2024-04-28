import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetareaComponent } from './netarea.component';

describe('NetareaComponent', () => {
  let component: NetareaComponent;
  let fixture: ComponentFixture<NetareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
