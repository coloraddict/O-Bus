import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  http = inject(HttpClient);

  buses: any = [];
  boardingPoints: any = [];
  droppingPoints: any = [];

  getBuses(): Observable<any> {
    return of(
      '[{"name":"Royal Exclusive","departure":"10:00 PM","coachType":"AC","seatsAvailable":36,"fare":300},{"name":"Royal Exclusive","departure":"12:00 PM","coachType":"AC","seatsAvailable":36,"fare":300},{"name":"Royal Exclusive","departure":"3:00 PM","coachType":"Non AC","seatsAvailable":36,"fare":1300},{"name":"Tisha Exclusive","departure":"7:00 PM","coachType":"Non AC","seatsAvailable":250,"fare":1300},{"name":"Tisha Exclusive","departure":"9:00 AM","coachType":"AC","seatsAvailable":250,"fare":1300},{"name":"Asia Line","departure":"9:00 AM","coachType":"AC","seatsAvailable":300,"fare":1300},{"name":"Asia Line","departure":"9:00 AM","coachType":"Non AC","seatsAvailable":300,"fare":1300}]',
    );
  }

  getBordingPoints(): Observable<any> {
    return of(
      '[{"id":"b1","placeName":"Dadar Bus Stand","time":"21:00","day":1},{"id":"b2","placeName":"Sion Junction","time":"21:25","day":1},{"id":"b3","placeName":"Kurla Depot","time":"21:50","day":1},{"id":"b4","placeName":"Vashi Sector 17","time":"22:30","day":1},{"id":"b5","placeName":"Panvel Central","time":"23:15","day":1},{"id":"b6","placeName":"Khopoli Toll Naka","time":"00:10","day":2},{"id":"b7","placeName":"Khalapur Rest Stop","time":"00:45","day":2}]',
    );
  }

  getDroppingPoints(): Observable<any> {
    return of(
      '[{"id":"d1","placeName":"Pune Station","time":"03:30","day":2},{"id":"d2","placeName":"Shivajinagar Depot","time":"03:55","day":2},{"id":"d3","placeName":"Kothrud Bus Stop","time":"04:20","day":2},{"id":"d4","placeName":"Hinjewadi Phase 1","time":"04:55","day":2},{"id":"d5","placeName":"Wakad Chowk","time":"05:10","day":2},{"id":"d6","placeName":"Pimpri Chinchwad","time":"05:35","day":2},{"id":"d7","placeName":"Nigdi Pradhikaran","time":"06:00","day":2}]',
    );
  }
}
