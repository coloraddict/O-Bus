import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Seat, SeatStatus } from '../../../models/seat';
import { SearchService } from '../../../services/search-service';
import { BoardingPoint } from '../../../models/boarding-point';
import { DroppingPoint } from '../../../models/dropping-point';
// import { JsonPipe } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-search',
  imports: [
    SelectModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    TableModule,
    TagModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    // JsonPipe,
    BadgeModule,
    DrawerModule,
    MessageModule,
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

  rows = [1, 2, 3, 4, 5, 6, 7, 8];
  cols = ['A', 'B', null, 'C', 'D']; // null = aisle placeholder

  seats: Seat[] = this.rows.flatMap((row) =>
    this.cols
      .filter((col): col is string => col !== null)
      .map((col) => ({
        id: `${row}${col}`,
        row,
        col,
        status: (['1A', '1D', '3B', '3C', '5A', '5D', '6B', '7C', '8A', '8D'].includes(
          `${row}${col}`,
        )
          ? 'booked'
          : 'available') as SeatStatus,
      })),
  );

  boardingPoint: BoardingPoint[] = [];
  selectedBoardingPoint?: string = '';

  droppingPoint: DroppingPoint[] = [];
  selectedDroppingPoint?: string = '';

  searchService = inject(SearchService);

  visible2: boolean = false;

  titleList: any = [{ title: 'Mr' }, { title: 'Mrs' }, { title: 'Miss' }];
  selectedTitle: string = '';

  constructor() {}

  ngOnInit() {
    this.loading = false;

    this.searchService.getBuses().subscribe((res: any) => {
      this.buses = JSON.parse(res);
    });

    this.searchService.getBordingPoints().subscribe((res: any) => {
      this.boardingPoint = JSON.parse(res);
    });

    this.searchService.getDroppingPoints().subscribe((res: any) => {
      this.droppingPoint = JSON.parse(res);
    });
  }

  clear(table: Table) {
    table.clear();
  }

  onViewSeats(bus: any) {}

  showDialog() {
    this.visible = true;
  }

  getSeat(row: number, col: string): Seat {
    return this.seats.find((s) => s.row === row && s.col === col)!;
  }

  getStatus(row: number, col: string): SeatStatus {
    return this.getSeat(row, col).status;
  }

  onSeatClick(row: number, col: string) {
    const seat = this.getSeat(row, col);
    if (seat.status === 'booked') return;
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
  }

  confirmBooking() {
    this.visible2 = true;
    this.selectedSeats.forEach((s) => (s.status = 'booked'));
  }

  get selectedSeats(): Seat[] {
    return this.seats.filter((s) => s.status === 'selected');
  }

  get selectedSeatLabels(): string {
    return this.selectedSeats.map((s) => s.id).join(', ');
  }

  get isSelectDisabled(): boolean {
    return this.selectedSeats.length === 0;
  }
}
