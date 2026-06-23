import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TravelService } from '../../../../services/travel.service';

@Component({
  selector: 'app-travel-detail',
  imports: [ButtonModule, SelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './travel-detail.html',
  styleUrl: './travel-detail.scss',
})
export class TravelDetail {
  adultFormGroup!: FormGroup;
  youthFormGroup!: FormGroup;
  seniorFormGroup!: FormGroup;

  adultAgeList: any = [];
  youthAgeList: any = [];
  seniorAgeList: any = [];

  protected readonly travelService = inject(TravelService);

  constructor(private fb: FormBuilder) {
    this.adultFormGroup = this.fb.group({
      adults: this.fb.array([this.createAdult()]),
    });
    this.youthFormGroup = this.fb.group({
      youths: this.fb.array([this.createYouth()]),
    });
    this.seniorFormGroup = this.fb.group({
      seniors: this.fb.array([this.createSenior()]),
    });
  }

  ngOnInit() {
    for (let i = 26; i <= 57; i++) {
      this.adultAgeList.push({ age: i + ' years' });
    }

    for (let i = 0; i <= 25; i++) {
      this.youthAgeList.push({ age: i + ' years' });
    }

    for (let i = 58; i < 100; i++) {
      this.seniorAgeList.push({ age: i + ' years' });
    }
  }

  get adults(): FormArray {
    return this.adultFormGroup.get('adults') as FormArray;
  }

  get youths(): FormArray {
    return this.youthFormGroup.get('youths') as FormArray;
  }

  get seniors(): FormArray {
    return this.seniorFormGroup.get('seniors') as FormArray;
  }

  createAdult(): FormGroup {
    this.travelService.increment('adult');
    return this.fb.group({
      age: [null],
    });
  }

  addAdult() {
    this.adults.push(this.createAdult());
  }

  removeAdult() {
    if (this.adults.length > 0) {
      this.travelService.decrement('adult');
      this.adults.removeAt(this.adults.length - 1);
    }
  }

  createYouth(): FormGroup {
    this.travelService.increment('youth');
    return this.fb.group({
      age: [null],
    });
  }

  addYouth() {
    this.youths.push(this.createYouth());
  }

  removeYouth() {
    if (this.youths.length > 0) {
      this.travelService.decrement('youth');
      this.youths.removeAt(this.youths.length - 1);
    }
  }

  createSenior(): FormGroup {
    this.travelService.increment('senior');
    return this.fb.group({
      age: [null],
    });
  }

  addSenior() {
    this.seniors.push(this.createSenior());
  }

  removeSenior() {
    if (this.seniors.length > 0) {
      this.travelService.decrement('senior');
      this.seniors.removeAt(this.seniors.length - 1);
    }
  }

  onChildClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
