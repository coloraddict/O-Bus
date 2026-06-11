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
}
