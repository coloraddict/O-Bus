import { Component } from '@angular/core';
import { BookingPanel } from '../../body/booking-panel/booking-panel';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-home',
  imports: [BookingPanel, Dashboard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
