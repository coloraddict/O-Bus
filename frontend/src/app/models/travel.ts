export interface TravelDetail {
  fromCity: City;
  toCity: City;
  fromDate: string;
  toDate: string;
  passengerCount: number;
}

export interface City {
  _id: string;
  name: string;
  state: string;
  lat: string;
  lon: string;
}
