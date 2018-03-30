// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, AfterViewInit, TemplateRef, ContentChild, Output, EventEmitter, forwardRef, HostListener, ChangeDetectorRef, OnChanges } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }, DatePipe]
})
export class DatepickerComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {

  /*
  * 作者： 胡文鸿
  * 日期： 2018年3月21日
  * 内容： 时间选择框组件可以用在form中，主要用于inputEditor组件
  */

  // 表单
  @Input() inline: boolean; // 是否放置在一行
  groupStyles: SafeStyle;

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

  @Input() showTime = false; // 是否选择时间
  @Input() timeOnly = false; // 是否只显示选择时间
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

  ch = {
    /** 每周第一天，0代表周日 */
    firstDayOfWeek: 0,
    /** 每周天数正常样式 */
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    /** 每周天数短样式（位置较小时显示） */
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    /** 每周天数最小样式 */
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    /** 每月月份正常样式 */
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    /**每月月份短样式 */
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    today: '今天',
    clear: '清除'
  };
  dateFormat = 'yyyy-MM-dd';
  dateValue: Date;
  calendar_show = false;
  mouseover = false;

  // 监听事件
  @HostListener('window:mousedown', ['$event'])
  onMousedown(event) {
    if (this.calendar_show && !this.mouseover) {
      this.calendar_show = false;
    }
  }
  constructor(
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
     if (this.showTime) {
       this.dateFormat = 'yyyy-MM-dd HH:mm:ss';
     }
     if (this.timeOnly) {
      this.dateFormat = 'HH:mm:ss';
     }
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
        this.value = this.datePipe.transform(this.value, this.dateFormat);
      }
    }
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
    // 解决
    // Expression has changed after it was checked. Previous value: 'status: true'. Current value: 'status: false'.
    setTimeout(() => {
      this.statusChange.emit(this.status);
      this.cdr.detectChanges();
    }, 0);
  }

  onSelectCalendar() {
    this.calendar_show = !this.calendar_show;
  }
  onMouse(event) {
    this.mouseover = event;
  }

  selectTimeDay(event) {
    this.value = this.datePipe.transform(event, this.dateFormat);
    if (!(this.showTime || this.timeOnly)) {
      this.calendar_show = false;
    }
  }

  clearValue() {
    this.value = null;
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
    if (value) {
      this._value = this.datePipe.transform(value, this.dateFormat);
    }
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
