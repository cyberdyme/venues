import { Component, OnInit, Input } from '@angular/core';
import { VenuesIssuenetService, JournalResponseContainer } from '../service/venues-issuenet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tranche',
  templateUrl: './tranche.component.html',
  styleUrls: ['./tranche.component.css']
})
export class TrancheComponent implements OnInit {
  @Input() issueId: number;
  public venuesIssuenetService$: Observable<JournalResponseContainer> = null;

  constructor(private venuesIssuenetService: VenuesIssuenetService) { }

  ngOnInit() {
    this.venuesIssuenetService$ = this.venuesIssuenetService.venueIssuenetStream$(this.issueId);
  }
}
