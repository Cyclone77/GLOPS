import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GLHmcTableComponent } from './gl-hmc-table.component';

describe('GLHmcTableComponent', () => {
  let component: GLHmcTableComponent;
  let fixture: ComponentFixture<GLHmcTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GLHmcTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GLHmcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
