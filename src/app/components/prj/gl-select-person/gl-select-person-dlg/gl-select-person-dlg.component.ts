import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-select-person-dlg',
  templateUrl: './gl-select-person-dlg.component.html',
  styleUrls: ['./gl-select-person-dlg.component.css']
})
export class GlSelectPersonDlgComponent implements OnInit {

  @Input() buttonName: string;
  @Input() titleText = '选择人员';
  @Input() size = ''; // small 小型 mini 超小
  @Input() Radio = false;

  // tslint:disable-next-line:no-input-rename
  @Input('Where') WHERE = {};

  selectPersonList = [];
  // tslint:disable-next-line:no-output-rename
  @Output('SelectList') selectPersonListChange = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-rename
  @Output() selectPersonDlgChange = new EventEmitter<any>();
  @Output() selectBeforeDlg = new EventEmitter<any>();
  @ViewChild('selectPerson') selectPerson;

  card = {
    toggle: false
  };
  constructor() { }

  ngOnInit() {

  }

  selectBefore() {
    const that = this;
    if (this.selectBeforeDlg.observers.length > 0) {
      that.selectBeforeDlg.emit(state => {
        this.card.toggle = state;
      });
    } else {
      that.card.toggle = true;
    }
  }

  personDlgSelect() {
    this.selectPersonListChange.emit(this.selectPersonList);
    this.card.toggle = false;
  }
  selectAtListChange(event) {
    this.selectPersonList  = event;
  }

  tagPersonClose(index) {
    this.selectPerson['tagPersonClose'](index);
  }

  selectPersonChange(event) {
    this.selectPersonDlgChange.emit(event);
  }
}
