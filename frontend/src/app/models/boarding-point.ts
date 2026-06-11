export interface BoardingPoint {
  id: string;
  placeName: string;
  time: string; // 24hr format  e.g. '21:00'
  day: number; // 1 = departure date, 2 = next day, 3 = day after, etc.
}
