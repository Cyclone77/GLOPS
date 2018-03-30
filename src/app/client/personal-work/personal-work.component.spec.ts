import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalWorkComponent } from './personal-work.component';

describe('PersonalWorkComponent', () => {
  let component: PersonalWorkComponent;
  let fixture: ComponentFixture<PersonalWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
