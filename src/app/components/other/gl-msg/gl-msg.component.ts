import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-gl-msg',
  templateUrl: './gl-msg.component.html',
  styleUrls: ['./gl-msg.component.css'],
  providers: [MessageService]
})
export class GlMsgComponent {
  @Input() msgs: Message[] = [];
  @Output() msgsChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private messageService: MessageService
  ) { }

  showMsg(msg: string, type: string) {
    // this.messageService.add({severity: type, summary: '系统消息', detail: msg });
    this.msgs.push({ severity: type, summary: '系统消息', detail: msg });
  }

  clear() {
    // this.messageService.clear();
    this.msgs.shift();
    this.msgsChange.emit(this.msgs);
  }
}
