import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindinputComponent } from './findinput.component';

describe('FindinputComponent', () => {
  let component: FindinputComponent;
  let fixture: ComponentFixture<FindinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
