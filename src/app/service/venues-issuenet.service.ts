import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of, concat, observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

export class JournalResponseContainer {
  issueId: number;
  currentState: string;
  pmid: string;
}

@Injectable({
  providedIn: 'root'
})
export class VenuesIssuenetService {
  private issueToJournalMapping = new Map<number, BehaviorSubject<JournalResponseContainer>>();
  private issueJournalMappingSubscriptions = new Map<number, Subscription>();

  constructor() {
  }

  public venueIssuenetStream$(issueId: number): Observable<JournalResponseContainer> {
    if (!this.issueToJournalMapping.has(issueId)) {

      const subject = new BehaviorSubject<JournalResponseContainer>({
        issueId,
        currentState: 'LOADING',
        pmid: ''
      });
      this.issueToJournalMapping.set(issueId, subject);
      setTimeout(() => this.initialise(issueId), 0);
    }

    return this.issueToJournalMapping.get(issueId).asObservable();
  }

  private restService(issueId: number): Observable<JournalResponseContainer> {
    return of({
      issueId,
      currentState: 'REST-SERVICE',
      pmid: '1'
    });
  }

  private signalR(issueId: number): Observable<JournalResponseContainer> {
    const itemsToReturn: JournalResponseContainer[] = [
      {issueId, currentState: 'SIGNALR-SERVICE1', pmid: '10'},
      {issueId, currentState: 'SIGNALR-SERVICE2', pmid: '11'},
      {issueId, currentState: 'SIGNALR-SERVICE3', pmid: '12'},
      {issueId, currentState: 'SIGNALR-SERVICE4', pmid: '13'},
      {issueId, currentState: 'SIGNALR-SERVICE5', pmid: '14'},
      {issueId, currentState: 'SIGNALR-SERVICE6', pmid: '15'},
      {issueId, currentState: 'SIGNALR-SERVICE7', pmid: '16'},
      {issueId, currentState: 'SIGNALR-SERVICE8', pmid: '17'},
      {issueId, currentState: 'SIGNALR-SERVICE9', pmid: '18'},
      {issueId, currentState: 'SIGNALR-SERVICE10', pmid: '19'},
      {issueId, currentState: 'SIGNALR-SERVICE11', pmid: '20'},
    ];
    return interval(1000 * issueId).pipe(
      map(x => itemsToReturn[x % 10]));
  }


  private initialise(issueId: number) {
    const restService = this.restService(issueId);
    const signalRService = this.signalR(issueId);

    const subscription = concat(restService, signalRService)
    .subscribe(x => {
        const subject = this.issueToJournalMapping.get(x.issueId);
        subject.next(x);
    });

    this.issueJournalMappingSubscriptions.set(issueId, subscription);
  }
}
