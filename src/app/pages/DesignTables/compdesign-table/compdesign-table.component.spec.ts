import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompdesignTableComponent } from './compdesign-table.component';

describe('CompdesignTableComponent', () => {
  let component: CompdesignTableComponent;
  let fixture: ComponentFixture<CompdesignTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompdesignTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompdesignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
