import { Component, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gl-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  @Input() title: string;
  @ContentChild('container') containerTemp: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
