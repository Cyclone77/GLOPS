import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { TreeModule, TreeNode, Tree, LazyLoadEvent } from 'primeng/primeng';

import { GlSelectUnitService } from './gl-select-unit.service';

import { Json } from '@glclass/json';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-select-unit',
  templateUrl: './gl-select-unit.component.html',
  styleUrls: ['./gl-select-unit.component.css']
})
export class GlSelectUnitComponent implements OnInit {

  @Input() isCheckBox = false;
  @Input() propagate = false; // 只有isCheckBox=true生效

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectedNode =  new EventEmitter<any>(); // 选择节点事件

  // 私有变量
  treeData: TreeNode[] = [];
  selectNode: any;
  findUnitList: Array<any>;
  selectionMode: string; //  "single", "multiple", and "checkbox".

  constructor(
    private request: GlSelectUnitService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.selectionMode = this.isCheckBox ? 'checkbox' : 'single';
    this.nodeExpand();
  }

  nodeExpand(event?, fn?) {
    const parentid = event && event.node && event.node.data['ITEM_ID'];
    if (event && event.node.children && event.node.children.length > 0) {
      if (fn) {
        fn();
      }
      return;
    }
    this.request.getUnitTree(parentid).then((json: Json) => {
      // tslint:disable-next-line:prefer-const
      let nodes: TreeNode[] = [];
      json.ListData.forEach(item => {
        nodes.push({
          label: item['DisplayChapterName'],
          data: item,
          expandedIcon: 'fa-folder-open',
          collapsedIcon: 'fa-folder',
          leaf: !item['CHILD']
        });
      });
      if (event && event.node.data) {
        event.node.children = nodes;
      } else {
        this.treeData = nodes;
      }
      if (fn) {
        fn();
      }
    });
  }

    //#region 机构树 查询 定位

  // 查找单位
  findDataEd(findText) {
    this.findUnitList = [];
    this.request.getFindUnitList({ name : findText }).then((json: Json) => {
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
        this.findUnitList = arr;
      }
    });
  }

  // tslint:disable-next-line:member-ordering
  findItems = [];
  // tslint:disable-next-line:member-ordering
  findItemsNum: number;

  // 展开的节点个数
  // tslint:disable-next-line:member-ordering
  expandnum = 1;

  // tslint:disable-next-line:member-ordering
  @ViewChild('treeArea') treeArea: ElementRef;

  // 选择查找内容
  selectedItem(item) {
    this.findItems = [];
    this.expandnum = 1;
    const itemid = item.ITEM_ID;
    for (let i = 0; i < itemid.length / 3; i++) {
      const str = itemid.substring(0, (i * 3 + 3));
      // 循环节点
      this.findItems.push(str);
    }

    this.forNodes({
      children: this.treeData,
      data: {}
    }, this.findItems, itemid);
  }
  forNodes(node: TreeNode, findItems: Array<any>, value: string) {
    if (node) {
      const nodeItemId = node.data.ITEM_ID;
      if (findItems.indexOf(nodeItemId) !== -1) {
        if (nodeItemId === value) {
            return;
        }
      }

      if (node.children.length > 0) {
        node.children.forEach(item => {
          // tslint:disable-next-line:no-shadowed-variable
          const nodeItemId = item.data.ITEM_ID;
          if (findItems.indexOf(nodeItemId) !== -1) {
            if (nodeItemId === value) {
              // 定位
              // this.selectNode = this.isCheckBox ? Array.prototype.concat(this.selectNode, [item]) : item;
              this.selectNode = this.isCheckBox ? [item] : item;
              this.locationScroll({ children: this.treeData });
              if (this.treeArea) {
                const el: HTMLElement = <HTMLElement>this.treeArea.nativeElement;
                el.scrollTop = this.expandnum * 23;
                this.cdr.detectChanges();
              }
              // 选中事件
              this.nodeSelect();
              return;
            } else {
              if (!item.expanded) {
                this.nodeExpand({ node: item }, () => {
                  item.expanded = true;
                  this.forNodes(item, findItems, value);
                });
              } else {
                this.forNodes(item, findItems, value);
              }
            }
          }
        });
      }
    }
  }

  // 定位滚动条
  locationScroll(node) {
    this.expandnum++;
    if (node.children && node.children.length > 0) {
      node.children.forEach(item => {
        this.locationScroll(item);
      });
    }
  }
  //#endregion

  dbTreeClick(event, node) {
    event.stopPropagation();
    node.expanded = true;
    this.nodeExpand({ node: node });
  }

  nodeSelect(event?) {
    this.onSelectedNode.emit(this.selectNode);
  }

  private selectExpandRecursive(node: TreeNode) {
    node.expanded = true;
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
        node.children.forEach( childNode => {
            this.expandRecursive(childNode, isExpand);
        } );
    }
  }

}
