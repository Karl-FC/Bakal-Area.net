import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockshearComponent } from './blockshear.component';

describe('BlockshearComponent', () => {
  let component: BlockshearComponent;
  let fixture: ComponentFixture<BlockshearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockshearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockshearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
