import { Injectable, Injector, ComponentFactory, ComponentRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';

import { GlMsgComponent } from './gl-msg.component';

@Injectable()

export class GlMsgService {

  private _modalCompFactory: ComponentFactory<GlMsgComponent>;

  constructor(
    private _injector: Injector,
    private _appRef: ApplicationRef,
    private _cfr: ComponentFactoryResolver,
  ) {
    this._modalCompFactory = this._cfr.resolveComponentFactory(GlMsgComponent);
  }

  // tslint:disable-next-line:member-ordering
  private compRef: ComponentRef<GlMsgComponent>;
  // tslint:disable-next-line:member-ordering
  private instance: GlMsgComponent;

  private _open(msg, type, duration, factory: ComponentFactory<GlMsgComponent>) {
    if (!this.instance) {
      // 在body的内部最前插入一个<nz-modal></nz-modal>方便进行ApplicationRef.bootstrap
      document.body.insertBefore(document.createElement(factory.selector), document.body.firstChild);

      this.compRef = this._appRef.bootstrap(factory);
      this.instance = this.compRef.instance;
    }

    this.instance.showMsg(msg, type);
    const timer = setTimeout(() => {
      // this.loader.remove(this.ref);
      this.instance.clear();
      clearTimeout(timer);
    }, 3000);
  }

  show(msg, type, duration = 3000) {
    if (!!msg) {
      this._open(msg, type, duration, this._modalCompFactory);
    }
  }

  success(msg, duration = 3000) {
    if (!!msg) {
      this._open(msg, 'success', duration, this._modalCompFactory);
    }
  }

  error(msg, duration = 3000) {
    this._open(msg, 'error', duration, this._modalCompFactory);
  }

  info(msg, duration = 3000) {
    if (!!msg) {
      this._open(msg, 'info', duration, this._modalCompFactory);
    }
  }

  debuginfo(msg) {
    console.log('[' + new Date().getMinutes() + ':'  + new Date().getMilliseconds() + ']: ' + msg);
  }

  warn(msg, duration = 3000) {
    if (!!msg) {
      this._open(msg, 'warn', duration, this._modalCompFactory);
    }
  }
}
