import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdcontrolComponent } from './udcontrol.component';

describe('UdcontrolComponent', () => {
  let component: UdcontrolComponent;
  let fixture: ComponentFixture<UdcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
