import { Component, OnInit, Input, AfterViewInit, TemplateRef, ContentChild, Output, EventEmitter, forwardRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }]
})
export class RadioComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  /*
  * 作者： 胡文鸿
  * 日期： 2018年3月21日
  * 内容： radio组件可以用在form中
  */

  // 标签
  @Input() data: Array<any>; // 选项label
  @Input() labeltext: string; // 标签内容
  @Input() labelwidth = 160; // 对齐方式:left, right, conter
  labelStyles: SafeStyle;

  // input
  @Input() isreadonly = false; // 是否只读
  @Input() required = false; // 是否必录
  @Input() groupname: string;
  @Input() inputwidth = 260;
  inputStyles: SafeStyle;

  _value: any = ''; // 输入值
  get value(): any {
    return this._value;
  }
  set value(v: any) {
    if (this._value !== v) {
      this._value = v;
      this.controlChange(v);
    }
  }

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): any {
    // no content required
    return setTimeout(() => {
      this.makeLabelStyles();
      this.makeInputStyles();

      this.groupname = (+ new Date()).toString();
    }, 0);
  }

  // 构建样式对象
  makeLabelStyles(): void {
    const label_align = this.labelwidth ? `width: ${this.labelwidth}px` : '';
    this.labelStyles = this.sanitizer.bypassSecurityTrustStyle(label_align);
  }

  // 构建input的样式对象
  makeInputStyles(): void {
    const input_width = this.inputwidth ? `width: ${this.inputwidth}px` : '';
    this.inputStyles = this.sanitizer.bypassSecurityTrustStyle(input_width);
  }

  // 实现接口
  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: Function): void {
    this.controlChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.controlTouch = fn;
  }

  private controlChange: Function = () => {};
  private controlTouch: Function = () => {};
}

