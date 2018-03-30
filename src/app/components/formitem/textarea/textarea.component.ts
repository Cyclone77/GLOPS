// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, AfterViewInit, TemplateRef, ContentChild, Output, EventEmitter, forwardRef, ChangeDetectorRef, OnChanges } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true
  }]
})
export class TextareaComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {

  /*
  * 作者： 胡文鸿
  * 日期： 2018年3月21日
  * 内容： 备注框组件可以用在form中，主要用于inputEditor组件
  */

  // input
  @Input() rows = 3;

  // form子组件的共有属性
  @Input() labeltext: string; // 标签内容
  @Input() labelwidth = 160; // 对齐方式:left, right, conter
  @Input() placeholder = '';
  @Input() inputwidth = 480;
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

