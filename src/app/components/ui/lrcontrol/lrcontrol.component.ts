import { Component, OnInit, Input, ContentChild, TemplateRef  } from '@angular/core';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-lrcontrol',
  templateUrl: './lrcontrol.component.html',
  styleUrls: ['./lrcontrol.component.css']
})
export class LrcontrolComponent implements OnInit {

  @Input() leftwidth: number;
  // tslint:disable-next-line:no-input-rename
  @Input('rightBgColor') bgcolor = '';
  @ContentChild('left') leftTmp: TemplateRef<any>;
  @ContentChild('right') rightTmp: TemplateRef<any>;

  swtchState: boolean;
  oldleftwidth: number;
  constructor() {}

  ngOnInit() {
    this.oldleftwidth = this.leftwidth;
  }

  switchTip() {
    this.leftwidth = this.swtchState ? this.oldleftwidth : 0;
    this.swtchState = !this.swtchState;
  }

}
