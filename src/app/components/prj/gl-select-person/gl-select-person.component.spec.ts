import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlSelectPersonComponent } from './gl-select-person.component';

describe('GlSelectPersonComponent', () => {
  let component: GlSelectPersonComponent;
  let fixture: ComponentFixture<GlSelectPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlSelectPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlSelectPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
