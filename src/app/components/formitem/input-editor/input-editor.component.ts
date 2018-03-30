import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';

// 显示字段
export interface EditorFieldSet {
  setid: string; // 指标集
  itemid: string; // 字段ID
  datatype: string; // 类型 string, date, code, memo

  // 共有特性
  labeltext: string; // 字段名称
  labelwidth?: number; // 标签宽度
  inputwidth?: number; // 输入框宽度
  required?: boolean; // 是否必录
  isspan?: boolean; // 是否文本模式
  isreadonly?: boolean; // 是否只读

  // 共有验证特性
  status?: boolean; // 验证是否通过，默认通过
  error?: string; // 验证错误信息

  // 日期特性（datepicker）
  showTime?: boolean; // 是否显示时间选择
  timeOnly?: boolean; // 是否只显示时间选择

  // 备注框特性 （textarea）
  row?: number; // 占几行

  // 代码框特性
  codeid?: string; // 代码
}

// 数据类型
export interface EditorFieldData {
  setid: string;
  itemid: string;
  datatype: string;
  data: any; // 字段数据
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-input-editor',
  templateUrl: './input-editor.component.html',
  styleUrls: ['./input-editor.component.css']
})
export class InputEditorComponent implements OnInit, AfterViewInit {

  /*
  * 作者： 胡文鸿
  * 日期： 2018年3月21日
  * 内容： inputEditor组件主要实现form表单的作用.
  */

  @Input() EditMode = false; // 是否编辑
  @Input() ButtonName = '保存'; // 按钮文本
  @Input() getAllField = false; // 是否获得全部字段值，默认保存时只保存变化字段
  @Input() inline = false; // 是否在一行
  @Input() isreadonly = false; // 是否只读
  @Input() isspan = false; // 是否文本
  @Input() required = false; // 是否必录

  @Input() labelwidth = 160; // 标签文本宽度（如果设置了字段的labelwidth则优先使用）
  @Input() inputwidth = 260; // 输入框宽度

  @Output() GetFieldsData = new EventEmitter<any>(); // 获得字段的值

  private _Fields: Array<EditorFieldSet>; // 显示字段
  @Input()
  set Fields(fields: Array<EditorFieldSet>) {
    if (!!fields && fields.length > 0) {
      this._Fields = this.buildVerification(fields);
    }
  }
  get Fields(): Array<EditorFieldSet> { return this._Fields; }

  // @Input() Entity: { [ key: string ]: string; };
  private _Entity: { [ key: string ]: string; };
  @Input() // 设置值
  set Entity(entity: { [ key: string ]: string; }) {
    this._Entity = Object.assign({}, entity);
  }
  get Entity(): { [ key: string ]: string; } { return this._Entity; }

  // 初始数据
  private Old_Entity: { [ key: string ]: string; } = null;
  private old_state = false;
  // 数据对象
  Fields_data: Array<EditorFieldData> = [];
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): any {
    this.cdr.detectChanges();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      // const changedProp = changes[propName];
      if (propName === 'Entity') {
        if (!this.old_state && this.isKey(this.Entity)) {
          this.Old_Entity = Object.assign({}, this.Entity);
          this.old_state = true;
        }
        this.verification();
        this.cdr.detectChanges();
      }
    }
  }

  // 给字段对象构造验证属性
  buildVerification(fields) {
    fields.forEach(item => {
      if (!Object.prototype.hasOwnProperty.call(item, 'status')) {
        item['status'] = true;
      }
      if (!Object.prototype.hasOwnProperty.call(item, 'error')) {
        item['error'] = '';
      }
    });
    return fields;
  }

  // 设置值
  SetVal(data: { [ key: string ]: string }) {
    const new_Entity = Object.assign({}, this.Entity);
    // tslint:disable-next-line:forin
    for (const item in data) {
      new_Entity[item] = data[item];
    }
    this.Entity = new_Entity;
    this.cdr.detectChanges();
  }

  // 构造数据对象
  private buildFileld_Data() {
    this.Fields_data = [];
    this.Fields.forEach(item => {
      if (!this.getAllField) {
        if (this.isKey(this.Entity)) {
          // tslint:disable-next-line:max-line-length
          if ((!Object.prototype.hasOwnProperty.call(this.Old_Entity, item.itemid) || this.Entity[item.itemid] !== this.Old_Entity[item.itemid]) && !!this.Entity[item.itemid]) {
            this.setFile_Data(item);
          }
        }
      } else {
        this.setFile_Data(item);
      }
    });
  }

  private setFile_Data(item: EditorFieldSet) {
    this.Fields_data.push({
      setid: item.setid,
      itemid: item.itemid,
      datatype: item.datatype,
      data: this.Entity[item.itemid]
    });
  }

  // 保存事件
  private SaveEvent() {
    this.buildFileld_Data();
    if (this.verification()) {
      this.GetFieldsData.emit(this.Fields_data);
    }
    // console.log(this.Fields_data);
  }

  // 验证
  private verification() {
    let status = true;
    this.Fields.forEach(item => {
      if (!item.status) {
        status = false;
      }
    });
    return status;
  }
  // 判断对象是否存在键
  private isKey(obj: { [ key: string ]: string }) {
    for (const key in obj) {
      if (obj[key] + 1) {
        return true;
      }
    }
    return false;
  }
}
