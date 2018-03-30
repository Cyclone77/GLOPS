import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LrcontrolComponent } from './lrcontrol.component';

describe('LrcontrolComponent', () => {
  let component: LrcontrolComponent;
  let fixture: ComponentFixture<LrcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LrcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
