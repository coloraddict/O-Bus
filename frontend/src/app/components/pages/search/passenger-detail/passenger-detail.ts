import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { TravelService } from '../../../../services/travel.service';
import { TravelDetail } from '../../../../models/travel';

@Component({
  selector: 'app-passenger-detail',
  imports: [FormsModule, ReactiveFormsModule, SelectModule, ButtonModule, DrawerModule],
  templateUrl: './passenger-detail.html',
  styleUrl: './passenger-detail.scss',
})
export class PassengerDetail {
  passengerForm!: FormGroup;

  passengerCount: number = 5;

  titleList: any = [{ title: 'Mr' }, { title: 'Mrs' }, { title: 'Miss' }];
  selectedTitle: string = '';

  @Input() visible: boolean = false;
  @Output() hide = new EventEmitter();

  travelService = inject(TravelService);

  travelDetail!: TravelDetail;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.travelService.getInitialTravelPlan().subscribe((res: TravelDetail) => {
      this.travelDetail = res;
      this.passengerCount = this.travelDetail.passengerCount;
      this.passengerForm = this.fb.group({
        passengers: this.fb.array(this.buildRows(this.passengerCount)),
      });
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

  onSubmitPassengers() {
    console.log(this.passengerForm.value);
  }

  addPassenger() {
    this.passengers.push(this.createPassengerRow());
  }

  removePassenger(index: number) {
    this.passengers.removeAt(index);
  }

  onHideDetails() {
    this.hide.emit(false);
  }
}
