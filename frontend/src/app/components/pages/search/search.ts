import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search',
  imports: [
    SelectModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    TableModule,
    TagModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  customers!: any[];
  representatives!: any[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  value!: string;
  buses!: any[];

  ngOnInit() {
    this.loading = false;
    this.customers = [
      {
        name: 'Scott Tiger',
        country: { code: '0011', name: 'US' },
        representative: { name: 'Scptt Toger', image: 'amyelsner.png' },
        status: 'unqualified',
        verified: true,
      },
      {
        name: 'Scott Tiger',
        country: { code: '0011', name: 'US' },
        representative: { name: 'Scptt Toger', image: 'amyelsner.png' },
        status: 'unqualified',
        verified: true,
      },
    ];
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' },
    ];

    this.buses = [
      {
        name: 'Royal Exclusive',
        departure: '10:00 PM',
        coachType: 'AC',
        seatsAvailable: 36,
        fare: 300,
      },
      {
        name: 'Royal Exclusive',
        departure: '12:00 PM',
        coachType: 'AC',
        seatsAvailable: 36,
        fare: 300,
      },
      {
        name: 'Royal Exclusive',
        departure: '3:00 PM',
        coachType: 'Non AC',
        seatsAvailable: 36,
        fare: 1300,
      },
      {
        name: 'Tisha Exclusive',
        departure: '7:00 PM',
        coachType: 'Non AC',
        seatsAvailable: 250,
        fare: 1300,
      },
      {
        name: 'Tisha Exclusive',
        departure: '9:00 AM',
        coachType: 'AC',
        seatsAvailable: 250,
        fare: 1300,
      },
      { name: 'Asia Line', departure: '9:00 AM', coachType: 'AC', seatsAvailable: 300, fare: 1300 },
      {
        name: 'Asia Line',
        departure: '9:00 AM',
        coachType: 'Non AC',
        seatsAvailable: 300,
        fare: 1300,
      },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return null;

      default:
        return null;
    }
  }

  onViewSeats(bus: any) {}
}
