import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mandate',
  templateUrl: './mandate.component.html',
  styleUrls: ['./mandate.component.css']
})
export class MandateComponent implements OnInit {
  public currentTab = 0;
  constructor() { }

  ngOnInit() {
  }

  setTabIndex($event) {
    this.currentTab = $event + 1;
  }
}
