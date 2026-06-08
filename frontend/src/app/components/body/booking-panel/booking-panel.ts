import { Component, inject, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { Country } from '../../../types/country.model';
import { FormsModule } from '@angular/forms';
import { BookingPanelService } from '../../../services/booking-panel.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TravelDetail } from './travel-detail/travel-detail';
import { TravelService } from '../../../services/travel.service';
import { NgStyle } from '@angular/common';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-booking-panel',
  imports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    DatePickerModule,
    SelectModule,
    FormsModule,
    AutoCompleteModule,
    TravelDetail,
    NgStyle,
  ],
  templateUrl: './booking-panel.html',
  styleUrl: './booking-panel.scss',
})
export class BookingPanel implements OnInit {
  country!: Country[];
  selectedCountry: Country | undefined;
  filteredCities1: any[] = [];
  filteredCities2: any[] = [];
  cityList: any[] = [];
  selectedCity1: any = 'Mumbai';
  selectedCity2: any = 'Bengaluru';
  fromDate: Date = new Date();
  toDate: any;
  showDetails: boolean = true;

  bookingService = inject(BookingPanelService);
  protected readonly travelService = inject(TravelService);

  isTravelDetailVisible: string = 'none';

  ngOnInit() {
    // this.toDate.setDate(this.fromDate.getDate() + 1);
    this.country = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.bookingService.getCities().subscribe((res: any) => {
      this.cityList = res.cities;
      console.log(this.cityList);
    });
  }

  filterCities1(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredCities1 = this.cityList
      .filter((city) => city.cityName.toLowerCase().includes(query))
      .filter((city) => !this.selectedCity2 || city.cityName !== this.selectedCity2.cityName);
  }

  filterCities2(event: any) {
    const query = event.query.toLowerCase();
    this.filteredCities2 = this.cityList
      .filter((city) => city.cityName.toLowerCase().includes(query))
      .filter((city) => !this.selectedCity1 || city.cityName !== this.selectedCity1.cityName);
  }

  addTravellerDetails() {
    this.isTravelDetailVisible = this.isTravelDetailVisible === 'none' ? 'block' : 'none';
  }
}
