import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  amd = {
    'MH0001' : false,
    'MH0002' : false,
    'MH0003' : false,
    'MH0004' : false,
    'MH0005' : false,
    'MH0006' : false,
    'MH0007' : false,
    'MH0008' : false,
    'MH0009' : false,
    'MH0010' : true,
    'MH0011' : false,
    'MH0012' : false
  };
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const localCache = JSON.parse(localStorage.getItem('GLPROGECT_001'));
    Object.assign(this.amd, localCache['AUTHORIZATION_MOD_DATA']);
    this.amd.MH0010 = true;
    if (localCache.UserAccount === 'sa') {
      this.amd.MH0003 = true;
      this.amd.MH0004 = true;
    }
  }

  handle(path: string): void {
    this.router.navigate([path]);
  }

}
