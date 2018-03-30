import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { GlCodeService } from './gl-code.service';
import { Json } from '../../../classes/json';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-code',
  templateUrl: './gl-code.component.html',
  styleUrls: ['./gl-code.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GlCodeComponent),
    multi: true
  }, MessageService]
})
export class GlCodeComponent implements OnInit, ControlValueAccessor  {

  // tslint:disable-next-line:no-input-rename
  @Input('size') csize: string; // 尺寸
  // tslint:disable-next-line:no-input-rename
  @Input('title') codeTitle: string;

  // tslint:disable-next-line:no-input-rename
  @Input() CodeID: string; // 代码项

  spanCodeText: string;
  @Input() CodeText: string;
  @Input() ModeuleID: string; // 功能编码
  @Input() gldisabled: boolean; // 是否只读
  @Input() relationUnitID: string;

  // form相关
  @Input() model: any = '';
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() CodeTextChange: EventEmitter<any> = new EventEmitter<any>();

  // code项全部内容
  CodeData = [];
  Codehierarchy = []; // 显示内容
  CodePath = []; // 选择路径
  pathChild = []; // 构建路径
  selectedItem = {}; // 当前选择代码项
  // 代码相关属性
  code = {
    toggle: false,
    loading: false
  };

  // 查找框相关
  findedData = [];

  constructor(
    private request: GlCodeService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  handleInput(val: string, codetext?: string): void {
    this.model = val;
    this.modelChange.emit(val);
    this.CodeText = codetext;
    this.CodeTextChange.emit(codetext);
    this.controlChange(val);
  }

  writeValue(value: any): void {
    this.model = value;
    if (this.model) {
      this.loadCodeData(true);
    } else {
      this.CodeText = '';
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

  // 点击事件 打开代码框
  clickHandle(event) {
    if (this.gldisabled) {
      return;
    }

    if (!this.ModeuleID) {
      this.showMsg('功能编码未设置', 'error');
      return;
    }

    if (!this.CodeID) {
      this.showMsg('代码编码未设置', 'error');
      return;
    }

    switch (this.CodeID) {
      case 'N':
        this.loadUnitCode({}, true);
        break;
      case 'M':
        this.loadB0002Code({}, true);
        break;
      default:
        this.loadCodeData();
    }
  }

  loadCodeData(isInit?) {
    this.request.getCodeItemData({
      ModuleID: this.ModeuleID,
      CodeID: this.CodeID
    }).then((json: Json) => {
      if (!json.IsSucceed) {
        this.showMsg('代码项获取失败！', 'error');
      } else {
        this.CodeData = json.ListData;

        this.selectedItem = {};
        this.buildSetContinue(this.model);
        if (!isInit) {
          this.code.toggle = true;
        }
      }
    }, err => {
      this.showMsg(err.message, 'error');
    });
  }

  // 初始化过滤
  buildSetContinue(parent) {
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
  }

  // 构建导航
  buildMeun(list: Array<any>, parent = '.') {
    const data = list.find(item => {
      return item.ITEM_ID === parent;
    });

    if (data) {
      if (data.ITEM_ID === parent) {
        // this.CodeText = data.ITEM_NAME;
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

  // 查找内容后数据绑定
  findDataEd(findtext: string) {
    findtext = String.prototype.trim.call(findtext);
    if (this.CodeID === 'N') {
      this.findUnit(findtext);
      return;
    }
    const findList = [];
    let index = 0;
    this.CodeData.forEach(item => {
      if (item.ITEM_NAME.indexOf(findtext) > -1 && index < 6) {
        findList.push(Object.assign({ label : item.ITEM_NAME }, item));
        index++;
      }
    });
    this.findedData = findList;
  }

  // 查找内容点击事件
  findSelectedItem(item) {
    if (this.CodeID === 'N') {
      this.findSelectItem(item);
      return;
    }
    this.buildSetContinue(item.ITEM_ID);
    this.selectedItem = item;
  }

  // 代码点击事件
  selectCodeItem(data) {
    // this.CodePath.push(item);
    this.selectedItem = data;
    switch (this.CodeID) {
      case 'N':
        this.loadUnitCode(data);
        break;
      case 'M':
        this.loadB0002Code(data);
        break;
      default:
        this.buildSetContinue(data && data.ITEM_ID);
    }
  }

  // 代码导航点击事件
  codePathHandle(item) {
    switch (this.CodeID) {
      case 'N':
        this.selectCodeItem(item);
        break;
      default:
      this.selectCodeItem(item);
    }
  }

  // 点击事件 关闭代码框
  closeDlg() {
    // this.CodeText = this.selectedItem['ItemName'];
    // 代码类型判断不能选则虚拟节点
    if (this.CodeID === 'N') {
      if (this.selectedItem['ITEM_TYPE'] !== 'N') {
        this.showMsg('不能选择虚拟节点', 'error');
        return;
      }

      if (this.selectedItem && this.selectedItem['UNIT_ID']) {
        // this.CodeText = this.selectedItem['ItemName'];
        this.handleInput(this.selectedItem['UNIT_ID'],  this.selectedItem['ITEM_NAME']);
      }

      this.code.toggle = false;
      return;
    }

    if (this.CodeID === 'M') {
      if (this.selectedItem && this.selectedItem['UNIT_ID']) {
        // this.CodeText = this.selectedItem['ItemName'];
        this.handleInput(this.selectedItem['UNIT_ID'],  this.selectedItem['ITEM_NAME']);
      }

      this.code.toggle = false;
      return;
    }

    if (this.selectedItem && this.selectedItem['ITEM_NAME']) {
      // this.CodeText = this.selectedItem['ItemName'];
      this.handleInput(this.selectedItem['ITEM_ID'],  this.selectedItem['ITEM_NAME']);
    }
    this.code.toggle = false;
  }

  //#region  加载单位类型代码
  loadUnitCode(node = {}, start?: boolean) {
    // tslint:disable-next-line:no-unused-expression
    new Promise((res, rej) => {
      if (start) {
        this.request.getUnitId(this.model).then((json: Json) => {
          if (json.IsSucceed) {
            node = json.Data;
            res();
          }
        });

        if (!!this.model) {
          this.code.loading = true;
          this.request.getUnitIdPath(this.model).then((json: Json) => {
            if (json.IsSucceed) {
              this.CodePath = json.ListData.map(item => {
                return item;
              });
              this.code.loading = false;
              // console.log(this.model);
            }
          });
        }
      } else {
        res();
      }
    }).then(res => {
      const parentid = node ? node['ITEM_ID'] : '.';
      this.request.getUnitTree(parentid || '.').then((json: Json) => {
        if (json.IsSucceed) {
          this.buildUnit_ItemList(json.ListData, node);
        }
      });
    });
  }

  buildUnit_ItemList(data, node) {
    const ucList = [];
    data.forEach(item => {
      ucList.push(item);
    });
    this.Codehierarchy = ucList;
    this.buildUnit_Menu(data, node);
    this.code.toggle = true;
  }

  buildUnit_Menu(list, node) {
    if (node.ITEM_ID) {
      const index = this.CodePath.indexOf(node);
      if (index > -1) {
        this.CodePath.splice(index + 1);
      } else {
        this.CodePath.push(node);
      }
    } else {
      this.CodePath = [];
    }
  }

  findUnit(findtext) {
    this.findedData = [];
    this.request.getFindUnitList({ name : findtext }).then((json: Json) => {
      if (json.IsSucceed) {
        let index = 0;
        const arr = [];
        for (const item of json.ListData) {
          arr.push(Object.assign({ label: item.DisplayChapterName}, item));
          index ++;
          if (index > 7) {
            break;
          }
        }
        this.findedData = arr;
      }
    });
  }

  findSelectItem(item) {
    this.handleInput(item['UNIT_ID'],  item['ITEM_NAME']);
    this.selectedItem = item;
    this.loadUnitCode(item, true);
  }
  //#endregion

  //#region 部门加载

  loadB0002Code(node = {}, start?: boolean) {
    if (node['ITEM_ID']) {
      this.CodePath = [node];
      this.Codehierarchy = [];
      return;
    }
    const parentid = this.relationUnitID;
    this.request.getB0002(parentid).then((json: Json) => {
      if (json.IsSucceed) {
        this.buildB0002_ItemList(json.ListData, node);
      }
    });
  }

  // 构建部门代码项
  buildB0002_ItemList(data, node) {
    const ucList = [];
    data.forEach(item => {
      ucList.push(item);
    });
    this.Codehierarchy = ucList;
    this.buildB0002_Menu(data, node);
    this.code.toggle = true;
  }

  buildB0002_Menu(list, node) {
    if (node.ITEM_ID) {
      const index = this.CodePath.indexOf(node);
      if (index > -1) {
        this.CodePath.splice(index + 1);
      } else {
        this.CodePath.push(node);
      }
    } else {
      this.CodePath = [];
    }
  }
  //#endregion

  showMsg(msg: string, type: string) {
    this.messageService.add({severity: type, summary: '系统消息', detail: msg });
  }
}
