import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsSupComponent } from './departments-sup.component';

describe('DepartmentsSupComponent', () => {
  let component: DepartmentsSupComponent;
  let fixture: ComponentFixture<DepartmentsSupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsSupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
