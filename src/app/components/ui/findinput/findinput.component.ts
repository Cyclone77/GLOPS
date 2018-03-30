import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-findinput',
  templateUrl: './findinput.component.html',
  styleUrls: ['./findinput.component.css']
})
export class FindinputComponent implements OnInit {

  @Input() findedData: Array<any>; // 列表数据
  @Input() width: string; // 宽度 eg: 180px;
  @Input() placeholder = '请输入查找内容';

  // tslint:disable-next-line:no-output-rename
  @Output('selected-item') selectedItem = new EventEmitter<any>(true);
  // tslint:disable-next-line:no-output-rename
  @Output('find-data-ed') finddataed = new EventEmitter<any>(); // 查找后事件

  findText = '';
  selectShow: boolean;
  mouseout: boolean;

  // 监听事件
  @HostListener('window:mousedown', ['$event'])
  onMousedown(event) {
    if (!this.mouseout) {
      this.selectShow = false;
    }
  }
  // 监听事件
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.finddata();
    }
  }
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  finddata() {
    if (this.findText) {
      // tslint:disable-next-line:no-unused-expression
      this.finddataed.emit(this.findText);
      // this.selectShow = this.findedData.length > 0;
      this.selectShow = true;
    }
  }

  makeSelectStyles(): SafeStyle {
    const width = this.width ? `width: ${this.width};` : '';
    return this.sanitizer.bypassSecurityTrustStyle(width);
  }

  selectItem(item) {
    this.findText = item.label;
    this.selectShow = false;
    this.selectedItem.emit(item);
  }

  mouseHandle(isEnter: boolean = false): void {
    this.mouseout = isEnter;
  }

}
