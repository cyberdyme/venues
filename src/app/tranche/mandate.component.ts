import { Component, OnInit } from '@angular/core';
import { VenuesIssuenetService, JournalResponseContainer } from '../service/venues-issuenet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mandate',
  templateUrl: './mandate.component.html',
  styleUrls: ['./mandate.component.css']
})
export class MandateComponent implements OnInit {
  public currentTab = 0;
  public venuesIssuenetService$: Observable<JournalResponseContainer> = null;

  constructor(private venuesIssuenetService: VenuesIssuenetService) { }

  ngOnInit() {
  }

  setTabIndex($event) {
    this.currentTab = $event + 1;

    console.log('CURRENT INDEX:', this.currentTab);
    this.venuesIssuenetService$ = this.venuesIssuenetService.venueIssuenetStream$(this.currentTab);
  }

  onFocusChanged($event) {
  }
}
