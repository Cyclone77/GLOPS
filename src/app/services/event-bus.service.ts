import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventBusService {

  private callback: EventEmitter<any>;
  private subscriberObj: any;
  private symbolArr = [];
  public constructor() {
    this.callback = new EventEmitter();
    this.subscriberObj = {};

    this.callback.subscribe((eventObj) => {
      if (this.subscriberObj.hasOwnProperty(eventObj.eventName)) {
        for (const fn of this.subscriberObj[eventObj.eventName]) {
          fn.apply(null, [eventObj.data]);
        }
      }
    });
  }

  public on(eventName: string, cb: (x: any) => void) {
    // if (!this.subscriberObj.hasOwnProperty(eventName)) {
    //   this.subscriberObj[eventName] = [];
    // }
    this.subscriberObj[eventName] = [];
    this.subscriberObj[eventName].push(cb);
  }

  public emit(eventName: string, data?: any) {
    this.callback.emit({ eventName: eventName, data: data });
  }

}
