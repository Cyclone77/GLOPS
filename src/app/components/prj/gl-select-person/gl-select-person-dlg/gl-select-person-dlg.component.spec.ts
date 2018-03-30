import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlSelectPersonDlgComponent } from './gl-select-person-dlg.component';

describe('GlSelectPersonDlgComponent', () => {
  let component: GlSelectPersonDlgComponent;
  let fixture: ComponentFixture<GlSelectPersonDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlSelectPersonDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlSelectPersonDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
