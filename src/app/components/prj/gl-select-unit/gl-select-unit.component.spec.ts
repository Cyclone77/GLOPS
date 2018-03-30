import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlSelectUnitComponent } from './gl-select-unit.component';

describe('GlSelectUnitComponent', () => {
  let component: GlSelectUnitComponent;
  let fixture: ComponentFixture<GlSelectUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlSelectUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlSelectUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
