import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandServiceComponent } from './demand-service.component';

describe('DemandServiceComponent', () => {
  let component: DemandServiceComponent;
  let fixture: ComponentFixture<DemandServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
