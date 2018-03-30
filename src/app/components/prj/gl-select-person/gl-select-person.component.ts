import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { GlSelectPersonService } from '@glprj/gl-select-person/gl-select-person.service';
import { Json } from '@glclass/json';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-select-person',
  templateUrl: './gl-select-person.component.html',
  styleUrls: ['./gl-select-person.component.css']
})
export class GlSelectPersonComponent implements OnInit {

  @Input() Radio = false; // 是否单选
  @Input() selectAtList = [];
  // tslint:disable-next-line:no-input-rename
  @Input('Where') WHERE = {};
  @Output() selectAtListChange = new EventEmitter<any>();
  @Output() selectPersonChange = new EventEmitter<any>();

  personFields = [{
    ITEM_ID: 'B0001_CN',
    ITEM_NAME: '单位',
    ITEM_VAL: ''
  }, {
    ITEM_ID: 'A0101',
    ITEM_NAME: '姓名',
    ITEM_VAL: ''
  }, {
    ITEM_ID: 'A0107',
    ITEM_NAME: '出生日期',
    ITEM_VAL: ''
  }, {
    ITEM_ID: 'A0177',
    ITEM_NAME: '身份证号',
    ITEM_VAL: ''
  }];

  // 表格参数
  totalRecords: number;
  tblData = [];
  event_old: any;

  selectedUnit = { label: '' };
  selectPersonList_old = [];
  selectPersonList = []; // 当前选中
  selectAll = [];

  photoPath: string;
  findedData: any;
  cols = [];
  selectPerson: any; // 单选
  constructor(
    private request: GlSelectPersonService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loadResumeData(event);
  }

  selectUnit(node) {
    this.selectedUnit = node;
    // this.checkedInit();
    this.loadResumeData(this.event_old, node.data.UNIT_ID);
  }

  loadResumeData(event?: LazyLoadEvent, unitid?: string) {
    this.event_old = event;
    // this.selectPersonList_old = [].concat(this.selectPersonList);
    const data = {
      UnitID: '.',
      ModuleID: 'M00003',
      SetID: 'A01',
      StartRowIndex: event && event.first || 0,
      PageSize: event && event.rows || 6
    };
    Object.assign(data, this.WHERE);
    if (unitid) {
      // tslint:disable-next-line:semicolon
      data.UnitID = unitid
    }
    let ajaxOp = new Promise((resolve, reject) => { });
    if (!!data['BUSI_ID']) {
      ajaxOp = this.request.getBusiPersonList(data);
    } else {
      ajaxOp = this.request.getPersonList(data);
    }
    ajaxOp.then((json: Json) => {
      if (json.SignData === 0) {
        console.log(JSON.stringify(data));
      }

      this.totalRecords = json.SignData;
      this.tblData = json.ListData;
      // this.selectPersonList = this.selectPersonList_old;
      this._setCheckAll();
      this.cdr.detectChanges();
    }, err => {
      console.log(err);
    });
  }

  // 撤选人员
  tagPersonClose(index) {
    const keyid = this.selectPersonList[index];
    this.selectPersonList_old = [].concat(this.selectPersonList);
    this.selectPersonList_old.splice(index, 1);
    this.selectPersonList = this.selectPersonList_old;
    this.selectAtList.forEach((item, i) => {
      if (item.KEY_ID === keyid) {
        this.selectAtList.splice(i, 1);
      }
    });
    this._setCheckAll();
  }

  onHeadChange(event) {
    this.selectPersonList_old = [].concat(this.selectPersonList);
    if (!!event) {
      this.tblData.forEach(item => {
        const index = this.selectPersonList.indexOf(item.KEY_ID);
        if (index === -1) {
          this.selectPersonList_old.push(item.KEY_ID);
        }
      });
    } else {
      this.tblData.forEach(item => {
        const index = this.selectPersonList_old.indexOf(item.KEY_ID);
        if (index > -1) {
          this.selectPersonList_old.splice(index, 1);
        }
      });
    }
    this.selectPersonList = this.selectPersonList_old;

    this.setTagData(true, event);
  }

  onRowChange(event?) {
    this.setTagData(false, event);
  }

  updataDelTagText() {
    const selectAted = [].concat(this.selectAtList);
    this.selectAtList = selectAted;
  }

  // 更新tag标签
  setTagData(isAll: boolean, event: boolean) {
    let stateAll = true;
    this.tblData.forEach(item => {
      const index = this._isArrayItem(this.selectAtList, 'KEY_ID', item.KEY_ID);
      const indexNum = this.selectPersonList.indexOf(item.KEY_ID);
      if (isAll) {
        // 设置全选
        if (event && index === -1) {
          this.selectAtList.push(item);
        }
        if (!event && index > -1) {
          this.selectAtList.splice(index, 1);
        }
      } else {
        // 设置单选
        if (event && index === -1 && indexNum > -1) {
          this.selectAtList.push(item);
        }
        if (!event && index > -1 && indexNum === -1) {
          this.selectAtList.splice(index, 1);
        }
      }
      stateAll = stateAll && indexNum > -1;
    });
    this._setCheckAll();
    this.selectAtListChange.emit(this.selectAtList);
  }

  selectionChange(data) {
    this.personFields.forEach(item => {
      item.ITEM_VAL = data[item.ITEM_ID];
    });

    this.photoPath = this.request.getPersonPhoto({
      KEY_ID: data.KEY_ID,
      DATA_ROW: -1
    });
  }

  checkedInit() {
    this.selectPersonList = [];
    this.selectPersonList_old = [];
    this.selectAtList = [];
    // this.selectAtListChange.emit(this.selectAtList);
  }

  // 设置全选是否选中
  _setCheckAll() {
    let stateAll = true;
    this.tblData.forEach(item => {
      const indexNum = this.selectPersonList.indexOf(item.KEY_ID);
      stateAll = stateAll && indexNum > -1;
    });
    this.selectAll = stateAll ? ['all'] : [];
  }

  // 判断数组是否存在项
  _isArrayItem(arr: Array<any>, key: string, val: string): number {
    return arr.findIndex(item => {
      return item[key] === val;
    });
  }

  onRowSelect(event) {
    this.selectPersonList = [event.data];
    this.selectAtList = [event.data];
    this.selectPersonChange.emit(this.selectPerson);
  }

  findDataEd() { }
  selectedItem() { }
  onHeaderCheckboxToggle() { }
}
