import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlSelectUnitDlgComponent } from './gl-select-unit-dlg.component';

describe('GlSelectUnitDlgComponent', () => {
  let component: GlSelectUnitDlgComponent;
  let fixture: ComponentFixture<GlSelectUnitDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlSelectUnitDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlSelectUnitDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
