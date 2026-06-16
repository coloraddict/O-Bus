import { computed, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { TravelDetail } from '../components/body/booking-panel/travel-detail/travel-detail';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  travelDetail: any;

  readonly adultCount = signal<number>(0);
  readonly youthCount = signal<number>(0);
  readonly seniorCount = signal<number>(0);

  readonly total = computed(() => this.adultCount() + this.youthCount() + this.seniorCount());

  increment(category: string) {
    if (category === 'adult') {
      this.adultCount.update((c) => c + 1);
    }
    if (category === 'youth') {
      this.youthCount.update((c) => c + 1);
    }
    if (category === 'senior') {
      this.seniorCount.update((c) => c + 1);
    }
  }

  decrement(category: string) {
    if (category === 'adult') {
      this.adultCount.update((c) => c - 1);
    }
    if (category === 'youth') {
      this.youthCount.update((c) => c - 1);
    }
    if (category === 'senior') {
      this.seniorCount.update((c) => c - 1);
    }
  }

  setInitialTravelPlan(travelDetail: TravelDetail) {
    this.travelDetail = JSON.parse(JSON.stringify(travelDetail));
  }

  getInitialTravelPlan() {
    return of(this.travelDetail);
  }
}
