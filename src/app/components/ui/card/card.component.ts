import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @ContentChild('header') headerTmp: TemplateRef<any>;
  @ContentChild('body') bodyTmp: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
