import { Component, inject } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SearchService } from '../../../services/search-service';
import { SeatDetail } from './seat-detail/seat-detail';
import { PassengerDetail } from './passenger-detail/passenger-detail';
import { TravelService } from '../../../services/travel.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { TravelDetail } from '../../../models/travel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    SeatDetail,
    PassengerDetail,
    // JsonPipe,
    DatePipe,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  value!: string;
  buses!: any[];
  visible: boolean = false;

  searchService = inject(SearchService);
  travelService = inject(TravelService);

  visible2: boolean = false;

  travelDetail!: TravelDetail;

  isTravelConfirm: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loading = false;

    this.searchService.getBuses().subscribe((res: any) => {
      this.buses = JSON.parse(res);
    });

    this.travelService.getInitialTravelPlan().subscribe((res: TravelDetail) => {
      this.travelDetail = res;
    });

    if (!this.travelDetail) {
      this.router.navigate(['']);
      return;
    }
  }

  clear(table: Table) {
    table.clear();
  }

  onViewSeats(bus: any) {}

  showDialog() {
    this.visible = true;
  }

  onConfirm($event: any) {
    this.isTravelConfirm = true;
  }
}
