import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-select-unit-dlg',
  templateUrl: './gl-select-unit-dlg.component.html',
  styleUrls: ['./gl-select-unit-dlg.component.css']
})
export class GlSelectUnitDlgComponent implements OnInit {

  @Input() buttonName: string;
  @Input() isCheckBox: boolean;
  @Input() bodyHeight: number;
  @Input() size = ''; // small 小型 mini 超小

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClick =  new EventEmitter<any>(); // 选择节点事件
  public propagate: any;
  selectedNode: any;

  card = {
    toggle: false
  };
  constructor() { }

  ngOnInit() {
  }

  SelectedNode(event) {
    this.selectedNode = event;
  }

  unitDlgSelect() {
    this.onClick.emit(this.selectedNode);
    this.card.toggle = false;
  }
}
