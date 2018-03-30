import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  leftwidth = 260;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  quit() {
    this.router.navigate(['/logon']);
  }

  onMenuSwitch(state) {
    this.leftwidth = state ? 0 : 260;
  }
}
