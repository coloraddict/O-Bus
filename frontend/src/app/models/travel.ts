import { Seat } from '../models/seat';

export interface TravelDetail {
  fromCity: City | undefined;
  toCity: City | undefined;
  fromDate: string;
  toDate: string;
  passengerCount: number;
  boarding: string;
  dropping: string;
  seats: Seat[];
}

export interface City {
  _id: string;
  name: string | undefined;
  state: string;
  lat: string;
  lon: string;
}
