import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTrendComponent } from './work-trend.component';

describe('WorkTrendComponent', () => {
  let component: WorkTrendComponent;
  let fixture: ComponentFixture<WorkTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
