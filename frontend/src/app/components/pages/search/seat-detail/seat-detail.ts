import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Seat, SeatStatus } from '../../../../models/seat';
import { BoardingPoint } from '../../../../models/boarding-point';
import { DroppingPoint } from '../../../../models/dropping-point';
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { BadgeModule } from 'primeng/badge';
import { SearchService } from '../../../../services/search-service';
import { PanelModule } from 'primeng/panel';
import { TravelService } from '../../../../services/travel.service';
import { TravelDetail } from '../../../../models/travel';
import { DatePipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-detail',
  imports: [
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    BadgeModule,
    PanelModule,
    DatePipe,
    // JsonPipe,
  ],
  templateUrl: './seat-detail.html',
  styleUrl: './seat-detail.scss',
})
export class SeatDetail {
  rows = [1, 2, 3, 4, 5, 6, 7, 8];
  cols = ['A', 'B', null, 'C', 'D'];

  visible2: boolean = false;

  searchService = inject(SearchService);
  travelService = inject(TravelService);

  @Output() onConfirm = new EventEmitter<any>();

  travelDetail!: TravelDetail;

  totalFare = 0;
  GSTCharge = 5;
  totalGST = 0;
  netFare = 0;

  boardingPoint: BoardingPoint[] = [];
  selectedBoardingPoint?: any = '';

  droppingPoint: DroppingPoint[] = [];
  selectedDroppingPoint?: any = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.selectedBoardingPoint = '';
    this.selectedDroppingPoint = '';

    this.searchService.getBordingPoints().subscribe((res: any) => {
      this.boardingPoint = JSON.parse(res);
    });

    this.searchService.getDroppingPoints().subscribe((res: any) => {
      this.droppingPoint = JSON.parse(res);
    });

    this.travelService.getInitialTravelPlan().subscribe((res: TravelDetail) => {
      this.travelDetail = res;
      this.totalFare = this.travelDetail.fare * this.travelDetail.passengerCount;
      this.totalGST = (this.totalFare * this.GSTCharge) / 100;
      this.netFare = this.totalFare + this.totalGST;
    });

    if (!this.travelDetail) {
      this.router.navigate(['']);
      return;
    }
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

    if (this.selectedBoardingPoint && this.selectedDroppingPoint) {
      const detailObj = {
        boarding: this.selectedBoardingPoint,
        dropping: this.selectedDroppingPoint,
        seats: this.selectedSeats,
      };
      this.travelService.updateTravelInfo(detailObj).subscribe((res) => {
        this.onConfirm.emit(detailObj);
      });
    }
  }
}
