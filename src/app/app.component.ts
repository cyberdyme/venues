import { Component, OnInit } from '@angular/core';
import { VenuesIssuenetService } from './service/venues-issuenet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'venues';

  constructor(private venuesIssuenetService: VenuesIssuenetService) {
  }

  ngOnInit(): void {
    this.venuesIssuenetService.venueIssuenetStream$(1).subscribe(x => {
      console.log('OUTPUT:', x.pmid);
    });

    setTimeout(() => {
      this.venuesIssuenetService.venueIssuenetStream$(1).subscribe(x => {
        console.log('OUTPUT1:', x.pmid);
      });
    }, 1500);
  }
}
