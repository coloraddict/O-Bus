export type SeatStatus = 'available' | 'booked' | 'selected';

export interface Seat {
  id: string;
  row: number;
  col: string;
  status: SeatStatus;
}
