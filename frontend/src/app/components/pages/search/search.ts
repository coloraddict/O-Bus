import { Component, inject } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SearchService } from '../../../services/search-service';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { SeatDetail } from './seat-detail/seat-detail';
import { PassengerDetail } from './passenger-detail/passenger-detail';

@Component({
  selector: 'app-search',
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DrawerModule,
    SeatDetail,
    PassengerDetail,
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

  visible2: boolean = false;

  constructor() {}

  ngOnInit() {
    this.loading = false;

    this.searchService.getBuses().subscribe((res: any) => {
      this.buses = JSON.parse(res);
    });
  }

  clear(table: Table) {
    table.clear();
  }

  onViewSeats(bus: any) {}

  showDialog() {
    this.visible = true;
  }
}
