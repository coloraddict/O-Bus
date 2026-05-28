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

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-booking-panel',
  imports: [ToolbarModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, SelectModule, FormsModule, AutoCompleteModule],
  templateUrl: './booking-panel.html',
  styleUrl: './booking-panel.scss',
})
export class BookingPanel implements OnInit {

  country!: Country[];
  selectedCountry: Country | undefined;
  cities: any[] = [];
  cityList: any[] = [];
  selectedCity: any;

  bookingService = inject(BookingPanelService);

  ngOnInit() {
        this.country = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.bookingService.getCities().subscribe((res: any) => {
          this.cityList = res;
        })
    }

    search(event: AutoCompleteCompleteEvent) {
        const query = event.query.toLowerCase();
        this.cities = this.cityList.filter(city => 
          city.cityName.toLowerCase().includes(query)
        );
    }
}
