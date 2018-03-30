import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// import { UserService } from './../../services/user.service';
import { Json } from '../../classes/json';
import { UserService } from '../../services/user.service';
import { UserOption } from '../../classes/user-login';
import { GAjaxService } from '@glservice/g-ajax.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  userData: UserOption;

  data: any[] = [ {
    value: 'quit',
    label: '注销'
  }, {
    value: 'user-register',
    label: '用户注册'
  }, {
    value: 'demand-service',
    label: '请求服务'
  }, {
    value: 'demand-service-sub',
    label: '预约请求服务'
  }, {
    value: 'back',
    label: '返回主页',
    divided: true
  }];

  loginOutUrl = '/G003_GLOPS/Core/UserLogon/Logout';

  // 通讯录显示
  visibleAddress: boolean;
  // 通讯录内容
  addressList = [];
  Select_KEY_ID: string;
  findedData = [];

  @Output() menuSwitch = new EventEmitter<any>();
  @ViewChild('bookList') bookListEl: ElementRef;
  private state: boolean;

  // 监听事件
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e) {
    if (e.keyCode === 37 && e.ctrlKey) {
      this.onMenuSwitch(2);
    }
    if (e.keyCode === 39 && e.ctrlKey) {
      this.onMenuSwitch(-2);
    }
  }
  constructor(
    private router: Router,
    private http: GAjaxService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.getUserData();
    // this.getAddressBooks();
  }

  /**
   *
   *通过sessionStorage获取用户登录信息
   * @memberof HeaderComponent
   */
  getUserData() {
    const data = JSON.parse(localStorage.getItem('GLPROGECT_001'));
    this.userData = data;
  }

  selectitem(e) {
    switch (e.value) {
      case 'quit':
        this.loginOut();
        break;
      case 'user-register':
        this.router.navigate(['/user-register']);
        break;
      case 'demand-service':
        this.router.navigate(['/demand-service']);
        break;
      case 'demand-service-sub':
        this.router.navigate(['/demand-service', { subscribe: 'subscribe' }]);
        break;
      case 'back':
        this.router.navigate(['/client']);
        break;
    }
  }

  loginOut() {
    this.user.logout().then((json: Json) => {
        this.router.navigate(['/login']);
    });
  }

  // 打开通讯录
  openAddressBook() {
    this.visibleAddress = true;
  }

  // 获得通讯录
  getAddressBooks() {
    const url = '/G003_GLOPS/M00003/A01/GetAddressBook';
    const data = {
      UnitID: -1,
      ModuleID: 'M00003',
      SetID: 'A01'
    };

    this.http.post(url, data).then((json: Json) => {
      this.addressList = json.ListData;
    });
  }

  selectAddressBook(data) {
    this.Select_KEY_ID = data.KEY_ID;
  }

  // 菜单切换
  onMenuSwitch(keyState) {
    if (keyState) {
      this.state = 2 === keyState;
    } else {
      this.state = !this.state;
    }
    this.menuSwitch.emit(this.state);
  }

  // 查找选中
  selectedItem(event) {
    this.Select_KEY_ID = event.value;
    if (this.bookListEl) {
      const el: HTMLElement = <HTMLElement>this.bookListEl.nativeElement;
      const selectEl = el.querySelector(`.address-book[id="${event.value}"]`);
      el.scrollTop = selectEl['offsetTop'] - 20;
      // this.cdr.detectChanges();
    }
  }

  // 输入内容查找通讯录
  findDataEd(event) {
    this.findedData = [];
    const num = /^[0-9]*$/g;
    const str = /^[\u4e00-\u9fa5]*$/g;
    let type = -1; // 1:数字 2:汉字
    if (num.test(event)) {
      type = 1;
    }
    if (str.test(event)) {
      type = 2;
    }

    if (type !== -1) {
      this.addressList.forEach(item => {
        // 查询的是数字
        if (type === 1) {
          if ((item.C8201 && item.C8201.indexOf(event) > -1)
            || (item.C8202 && item.C8202.indexOf(event) > -1)) {
            this.findedData.push({
              // label: `${item.A0101}(${item.C8201}、${item.C8202})`,
              label: item.A0101,
              value: item.KEY_ID
            });
          }
        }

        // 查询的是中文
        if (type === 2) {
          if (item.A0101.indexOf(event) > -1) {
            this.findedData.push({
              // label: `${item.A0101}(${item.C8201 || '号码未知'}、${item.C8202 || '号码未知'})`,
              label: item.A0101,
              value: item.KEY_ID
            });
          }
        }
      });
    }
  }
}
