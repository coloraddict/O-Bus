import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, PanelModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  routes = ['Mumbai to Bangalore', 'Delhi to Jaipur', 'Kolkata to Hyderabad', 'Chennai to Pune'];

  reasons = [
    'Comfortable buses with modern amenities',
    'Affordable fares and transparent pricing',
    'Wide route network across major cities',
    'Easy booking and reliable customer support',
  ];
}
