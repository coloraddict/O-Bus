import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Seat, SeatStatus } from '../../../models/seat';
import { SearchService } from '../../../services/search-service';
import { BoardingPoint } from '../../../models/boarding-point';
import { DroppingPoint } from '../../../models/dropping-point';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { SeatDetail } from './seat-detail/seat-detail';

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
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    DrawerModule,
    SeatDetail,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  value!: string;
  buses!: any[];
  visible: boolean = false;

  rows = [1, 2, 3, 4, 5, 6, 7, 8];
  cols = ['A', 'B', null, 'C', 'D'];

  seats: Seat[] = this.rows.flatMap((row) =>
    this.cols
      .filter((col): col is string => col !== null)
      .map((col) => ({
        id: `${row}${col}`,
        row,
        col,
        status: (['1A', '1D', '3B', '3C', '5A', '5D', '6B', '7C', '8A', '8D'].includes(
          `${row}${col}`,
        )
          ? 'booked'
          : 'available') as SeatStatus,
      })),
  );

  boardingPoint: BoardingPoint[] = [];
  selectedBoardingPoint?: string = '';

  droppingPoint: DroppingPoint[] = [];
  selectedDroppingPoint?: string = '';

  searchService = inject(SearchService);

  visible2: boolean = false;

  titleList: any = [{ title: 'Mr' }, { title: 'Mrs' }, { title: 'Miss' }];
  selectedTitle: string = '';

  passengerForm!: FormGroup;

  @Input() passengerCount: number = 5;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loading = false;

    this.passengerForm = this.fb.group({
      passengers: this.fb.array(this.buildRows(this.passengerCount)),
    });

    this.searchService.getBuses().subscribe((res: any) => {
      this.buses = JSON.parse(res);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['passengerCount'] && !changes['passengerCount'].firstChange) {
      this.rebuildArray(changes['passengerCount'].currentValue);
    }
  }

  private buildRows(count: number): FormGroup[] {
    return Array.from({ length: count }, () => this.createPassengerRow());
  }

  createPassengerRow(): FormGroup {
    return this.fb.group({
      title: [null, Validators.required],
      name: [null, Validators.required],
      age: [null, Validators.required],
    });
  }

  get passengers(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }

  addPassenger() {
    this.passengers.push(this.createPassengerRow());
  }

  removePassenger(index: number) {
    this.passengers.removeAt(index);
  }

  private rebuildArray(count: number) {
    const current = this.passengers.length;

    if (count > current) {
      for (let i = current; i < count; i++) {
        this.passengers.push(this.createPassengerRow());
      }
    } else if (count < current) {
      for (let i = current; i > count; i--) {
        this.passengers.removeAt(i - 1);
      }
    }
  }

  clear(table: Table) {
    table.clear();
  }

  onViewSeats(bus: any) {}

  showDialog() {
    this.visible = true;
  }

  onSubmitPassengers() {
    console.log(this.passengerForm.value);
  }
}
