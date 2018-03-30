// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, AfterViewInit, TemplateRef, ContentChild, Output, EventEmitter, forwardRef, ChangeDetectorRef, OnChanges } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {

  /*
  * 作者：胡文鸿
  * 日期： 2018年3月21日
  * 内容： input组件可以用在form中，主要用于inputEditor组件
  */

  // 表单
  @Input() inline: boolean; // 是否放置在一行
  groupStyles: SafeStyle;
  @ContentChild('container') containerTemp: TemplateRef<any>; // 自定义内容

  // form子组件的共有属性
  @Input() labeltext: string; // 标签内容
  @Input() labelwidth = 160; // 对齐方式:left, right, conter
  @Input() placeholder = '';
  @Input() inputwidth = 260;
  @Input() isreadonly = false; // 是否只读
  @Input() isspan = false; // 是否文本模式
  @Input() required = false; // 是否必录

  labelStyles: SafeStyle;

  @Input() status = true; // 校验状态
  @Output() statusChange = new EventEmitter<any>();
  @Input() error: string; // status为false时生效，错误提示
  inputStyles: SafeStyle;

  _value: any = ''; // 输入值
  @Input() // value: any = ''; // 值
  get value(): any {
    return this._value;
  }
  set value(v: any) {
    if (this._value !== v) {
      this._value = v;
      this.valueChange.emit(v);
      this.verification();
    }
  }
  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.placeholder) {
      this.placeholder = '请输入内容';
    }
  }

  ngOnChanges(changes) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      // const changedProp = changes[propName];
      if (propName === 'value') {
        this.verification();
      }
    }
  }

  ngAfterViewInit(): any {
    // no content required
    return setTimeout(() => {
      this.markGroupStyles();
      this.makeLabelStyles();
      this.makeInputStyles();
      this.verification();
    }, 0);
  }

  // 验证是否必录
  private verification() {
    if (this.required && !this.value) {
      this.status = false;
      this.error = this.error || '内容不能为空';
    } else {
      this.status = true;
      this.error = '';
    }
    setTimeout(() => {
      this.statusChange.emit(this.status);
      this.cdr.detectChanges();
    }, 0);
  }

  // 构建表单样式对象
  markGroupStyles(): void {
    const group_inline = this.inline ? `display: inline-block;` : 'display: block;';
    this.groupStyles = this.sanitizer.bypassSecurityTrustStyle(group_inline);
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

  private controlChange: Function = item => {};
  private controlTouch: Function = () => {};
}
