import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlConfirmDlgComponent } from './gl-confirm-dlg.component';

describe('GlConfirmDlgComponent', () => {
  let component: GlConfirmDlgComponent;
  let fixture: ComponentFixture<GlConfirmDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlConfirmDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlConfirmDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
