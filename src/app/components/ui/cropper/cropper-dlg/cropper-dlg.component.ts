import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-cropper-dlg',
  templateUrl: './cropper-dlg.component.html',
  styleUrls: ['./cropper-dlg.component.css']
})
export class CropperDlgComponent implements OnInit {

  @Input() buttonName = '编辑';
  @Input() titleText = '图片上传编辑';

  @Output() getImgData = new EventEmitter<any>();

  @ViewChild('cropper') cropper;

  card = {
    toggle: false
  };
  constructor() { }

  ngOnInit() {
  }

  imgDlgCropperClose () {
    this.getImgData.emit(this.cropper);
    this.card.toggle = false;
  }

}
