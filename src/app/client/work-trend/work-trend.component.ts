import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-trend',
  templateUrl: './work-trend.component.html',
  styleUrls: ['./work-trend.component.css']
})
export class WorkTrendComponent implements OnInit {

  // 通知列表字段
  cols = [{
    field: 'A0305',
    header: '产品类型',
    width: 20
  }, {
    field: 'USER_NAME',
    header: '地区',
    width: 20
  }, {
    field: 'UNIT_NAME',
    header: '联系人',
    width: 20
  }, {
    field: 'TITLE',
    header: '网络环境',
    width: 20
  }, {
    field: 'TITLE',
    header: '队列时间',
    width: 30
  }, {
    field: 'TITLE',
    header: '服务要求',
    width: 20
  }];
  tblData = [];
  constructor() { }

  ngOnInit() {
  }

}
