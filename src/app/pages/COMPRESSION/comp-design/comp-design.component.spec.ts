import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompDesignComponent } from './comp-design.component';

describe('CompDesignComponent', () => {
  let component: CompDesignComponent;
  let fixture: ComponentFixture<CompDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompDesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
