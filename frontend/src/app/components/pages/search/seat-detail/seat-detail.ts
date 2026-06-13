import { Component, inject } from '@angular/core';
import { Seat, SeatStatus } from '../../../../models/seat';
import { BoardingPoint } from '../../../../models/boarding-point';
import { DroppingPoint } from '../../../../models/dropping-point';
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { BadgeModule } from 'primeng/badge';
import { SearchService } from '../../../../services/search-service';

@Component({
  selector: 'app-seat-detail',
  imports: [SelectModule, FormsModule, ReactiveFormsModule, MessageModule, BadgeModule],
  templateUrl: './seat-detail.html',
  styleUrl: './seat-detail.scss',
})
export class SeatDetail {
  rows = [1, 2, 3, 4, 5, 6, 7, 8];
  cols = ['A', 'B', null, 'C', 'D'];

  visible2: boolean = false;

  searchService = inject(SearchService);

  ngOnInit() {
    this.searchService.getBordingPoints().subscribe((res: any) => {
      this.boardingPoint = JSON.parse(res);
    });

    this.searchService.getDroppingPoints().subscribe((res: any) => {
      this.droppingPoint = JSON.parse(res);
    });
  }

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

  get selectedSeats(): Seat[] {
    return this.seats.filter((s) => s.status === 'selected');
  }

  get isSelectDisabled(): boolean {
    return this.selectedSeats.length === 0;
  }

  confirmBooking() {
    this.visible2 = true;
    this.selectedSeats.forEach((s) => (s.status = 'booked'));
  }
}
