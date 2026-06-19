import { Seat } from '../models/seat';

export interface TravelDetail {
  coachType: string;
  departure: string;
  fare: number;
  fromCity: City | undefined;
  fromDate: string;
  name: string;
  passengerCount: number;
  seatsAvailable: number;
  toCity: City | undefined;
  toDate: string;
  boarding: string;
  dropping: string;
  seats: Seat[];
}

export interface City {
  _id: string;
  name: string | undefined;
  state: string;
  lat: number;
  lon: number;
}
