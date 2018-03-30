import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlMsgComponent } from './gl-msg.component';

describe('GlMsgComponent', () => {
  let component: GlMsgComponent;
  let fixture: ComponentFixture<GlMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
