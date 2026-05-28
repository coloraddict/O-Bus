import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { City } from '../../../types/city.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-panel',
  imports: [ToolbarModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, SelectModule, FormsModule],
  templateUrl: './booking-panel.html',
  styleUrl: './booking-panel.scss',
})
export class BookingPanel implements OnInit {

  cities!: City[];
  selectedCity: City | undefined;

  ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
