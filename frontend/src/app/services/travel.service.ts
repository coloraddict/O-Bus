import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { TravelDetail } from '../models/travel';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private travelDetailState = new BehaviorSubject<TravelDetail>({} as TravelDetail);
  state$ = this.travelDetailState.asObservable();

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
    this.travelDetailState.next(JSON.parse(JSON.stringify(travelDetail)));
  }

  getInitialTravelPlan() {
    return this.travelDetailState;
  }

  updateTravelInfo(partial: Partial<TravelDetail>) {
    this.travelDetailState.next({
      ...this.travelDetailState.getValue(),
      ...partial,
    });
  }
}
