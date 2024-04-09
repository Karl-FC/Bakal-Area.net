import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticBucklingComponent } from './elastic-buckling.component';

describe('ElasticBucklingComponent', () => {
  let component: ElasticBucklingComponent;
  let fixture: ComponentFixture<ElasticBucklingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElasticBucklingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElasticBucklingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
