import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-travel-detail',
  imports: [ButtonModule, SelectModule, FormsModule],
  templateUrl: './travel-detail.html',
  styleUrl: './travel-detail.scss',
})
export class TravelDetail {
  value1: any;
  cityList: any[] = [];
}
