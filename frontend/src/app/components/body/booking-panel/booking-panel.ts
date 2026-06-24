import { Component, effect, inject, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { Country } from '../../../types/country.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookingPanelService } from '../../../services/booking-panel.service';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { TravelDetail } from './travel-detail/travel-detail';
import { TravelService } from '../../../services/travel.service';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';

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
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './booking-panel.html',
  styleUrl: './booking-panel.scss',
})
export class BookingPanel implements OnInit {
  country!: Country[];
  selectedCountry: Country | undefined;
  filteredCities1: any[] = [];
  filteredCities2: any[] = [];
  selectedCities1: any[] = [];
  selectedCities2: any[] = [];
  cityList: any[] = [];
  selectedCity1: any = 'Mumbai';
  selectedCity2: any = 'Bengaluru';
  fromDate: Date = new Date();
  toDate: any;
  passengerCount = 0;

  bookingService = inject(BookingPanelService);
  protected readonly travelService = inject(TravelService);

  isTravelDetailVisible: string = 'none';

  searchForm!: FormGroup;

  formSubmitted: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      fromCity: ['', [Validators.required]],
      toCity: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: [''],
      passengerCount: [0, [Validators.required, Validators.min(1)]],
    });

    effect(() => {
      const value = this.travelService.total();
      this.searchForm.patchValue({ passengerCount: value });
    });
  }

  ngOnInit() {
    this.bookingService.getCities().subscribe((res: any) => {
      this.cityList = res.cities;
    });
  }

  filterCities1(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredCities1 = this.cityList
      .filter((city) => city.name.toLowerCase().includes(query))
      .filter((city) => !this.selectedCity2 || city.name !== this.selectedCity2.name);
  }

  filterCities2(event: any) {
    const query = event.query.toLowerCase();
    this.filteredCities2 = this.cityList
      .filter((city) => city.name.toLowerCase().includes(query))
      .filter((city) => !this.selectedCity1 || city.name !== this.selectedCity1.name);
  }

  onSelectCity1(event: AutoCompleteSelectEvent) {
    this.selectedCity1 = event.value;
  }

  onSelectCity2(event: AutoCompleteSelectEvent) {
    this.selectedCity2 = event.value;
  }

  addTravellerDetails() {
    this.isTravelDetailVisible = this.isTravelDetailVisible === 'none' ? 'block' : 'none';
  }

  onSearch() {
    if (this.searchForm.invalid) return;
    this.travelService.setInitialTravelPlan(this.searchForm.value);
    this.router.navigateByUrl('search');
  }
}
