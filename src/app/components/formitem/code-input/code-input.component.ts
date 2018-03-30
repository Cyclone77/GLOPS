import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { CodeInputService } from './code-input.service';
import { Json } from '@glclass/json';
import { GlMsgService } from '@glother/gl-msg/gl-msg.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css'],
  providers: [GlMsgService]
})
export class CodeInputComponent implements OnInit {

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

  @Input() value: string;
  // _value: any = ''; // 输入值
  // @Input() // value: any = ''; // 值
  // get value(): any {
  //   return this._value;
  // }
  // set value(v: any) {
  //   if (this._value !== v) {
  //     this._value = v;
  //     this.valueChange.emit(v);
  //     this.verification();
  //   }
  // }
  @Output() valueChange = new EventEmitter<any>();

  // 特性
  @Input() codeid: string;

  @Input() codetext: string;
  @Output() codetextChange = new EventEmitter<any>();
  @Input() codename: string;
  @Input() moduleid: string;
  inputStyles: SafeStyle;

  // 私用
  unitmodal_show: boolean;
  private loading: boolean;
  private CodeData: any;

  Codehierarchy = []; // 显示内容
  CodePath = []; // 选择路径
  private pathChild = []; // 构建路径
  private selectedItem = {}; // 当前选择代码项
  findedData: any;
  constructor(
    private request: CodeInputService,
    private sanitizer: DomSanitizer,
    private msg: GlMsgService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.placeholder) {
      this.placeholder = '请选择内容';
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      // const changedProp = changes[propName];
      if (propName === 'value') {
        this.verification();
      }
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
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

  verification() {
    if (this.required && (!this.value || !this.codetext)) {
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

  // 代码框点击事件
  clickHandle() {
    switch (this.codeid) {
      case 'N':
        break;
      case 'M':
        break;
      default:
        this.loadCodeData();
    }
  }

  //#region 加载通用代码
  loadCodeData() {
    if (this.CodeData) {
      this.buildSetContinue(this.value);
      return;
    }
    this.request.getCodeItemData({
      ModuleID: this.moduleid,
      CodeID: this.codeid
    }).then((json: Json) => {
      if (!json.IsSucceed) {
        this.msg.show('代码项获取失败！', 'error');
      } else {
        this.CodeData = json.ListData;
        this.buildSetContinue(this.value);
      }
    }, err => {
      this.msg.show('代码项获取失败！', 'error');
    });
  }

  // 初始化过滤
  buildSetContinue(parent?) {
    parent = parent || '.';
    const itemChild = [];
    this.CodeData.forEach(item => {
      if (item.PARENT === parent) {
        itemChild.push(item);
      }
    });
    // 设置代码显示项
    this.Codehierarchy = itemChild;
    this.pathChild = [];
    this.buildMeun(this.CodeData, parent);

    // 选择项
    this.selectedItem = this.CodeData.find(item => {
      return item.ITEM_ID === parent;
    });

    this.unitmodal_show = true;
  }

  // 构建导航
  buildMeun(list: Array<any>, parent = '.') {
    const data = list.find(item => {
      return item.ITEM_ID === parent;
    });
    this.selectedItem = data;
    if (data) {
      if (data.PARENT === parent) {
      }
      this.pathChild.push(data);
      const child = [];
      this.CodeData.forEach(item => {
        if (item.ITEM_ID === data.PARENT) {
          child.push(item);
        }
      });
      this.buildMeun(child, data.PARENT);
    } else {
      this.CodePath = this.pathChild.reverse();
    }
  }

  // 代码导航点击事件
  codePathHandle(parent?) {
    switch (this.codeid) {
      case 'N':
        break;
      default:
      this.buildSetContinue(parent);
    }
  }

  //#endregion

  SelectCodeEvent() {
    if (this.selectedItem && this.selectedItem['ITEM_NAME']) {
      this.value = this.selectedItem['ITEM_ID'];
      this.codetext = this.selectedItem['ITEM_NAME'];

      this.valueChange.emit(this.value);
      this.codetextChange.emit(this.codetext);
      this.verification();
    }
    this.unitmodal_show = false;
  }

  findDataEd(event) {}
}
