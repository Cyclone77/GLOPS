import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-gl-confirm-dlg',
  templateUrl: './gl-confirm-dlg.component.html',
  styleUrls: ['./gl-confirm-dlg.component.css'],
  providers: [ ConfirmationService ]
})
export class GlConfirmDlgComponent implements OnInit {

  @Input() width: number;

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
  }

  show(options) {
    this.width = options.width || 300;

    // tslint:disable-next-line:no-unused-expression
    return new Promise((resolve, reject) => {
      this.confirmationService.confirm(Object.assign({
        header: options.title || '系统提示',
        message: options.message,
        accept: resolve,
        reject: reject
      }, options));
    });
  }
}
