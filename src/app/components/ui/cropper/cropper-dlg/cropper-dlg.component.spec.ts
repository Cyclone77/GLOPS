import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperDlgComponent } from './cropper-dlg.component';

describe('CropperDlgComponent', () => {
  let component: CropperDlgComponent;
  let fixture: ComponentFixture<CropperDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
