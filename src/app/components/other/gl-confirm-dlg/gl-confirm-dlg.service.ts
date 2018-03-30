import { Injectable, ComponentFactory, ComponentRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { GlConfirmDlgComponent } from './gl-confirm-dlg.component';

@Injectable()
export class GlConfirmDlgService {

  private compRef: ComponentRef<GlConfirmDlgComponent>;
  private instance: GlConfirmDlgComponent;
  private _modalCompFactory: ComponentFactory<GlConfirmDlgComponent>;

  constructor(
    private _cfr: ComponentFactoryResolver,
    private _appRef: ApplicationRef
  ) {
    this._modalCompFactory = this._cfr.resolveComponentFactory(GlConfirmDlgComponent);
  }

  open(options: Confirmation) {
    const factory = this._modalCompFactory;
    if (!this.instance) {
      // 在body的内部最前插入一个<nz-modal></nz-modal>方便进行ApplicationRef.bootstrap
      document.body.insertBefore(document.createElement(factory.selector), document.body.firstChild);

      this.compRef = this._appRef.bootstrap(factory);
      this.instance = this.compRef.instance;
    }

    return this.instance.show(options);
  }
}

export interface Confirmation {
  message: string;
  title?: string;
  width?: number;
  key?: string;
  icon?: string;
  header?: string;
  accept?: Function;
  reject?: Function;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
}

