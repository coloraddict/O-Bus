import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-mylist',
  imports: [TableModule, ButtonModule, InputTextModule, SelectModule, ReactiveFormsModule],
  templateUrl: './mylist.html',
  styleUrl: './mylist.scss',
})
export class Mylist {
  private fb = inject(FormBuilder);

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  travelerForm = this.fb.group({
    travelers: this.fb.array([]),
  });

  constructor() {
    this.travelers.push(
      this.createTraveler({
        name: 'Father',
        age: 65,
        gender: 'Male',
        isEdit: false,
      }),
    );

    this.travelers.push(
      this.createTraveler({
        name: 'Mother',
        age: 60,
        gender: 'Female',
        isEdit: false,
      }),
    );
  }

  get travelers(): FormArray {
    return this.travelerForm.get('travelers') as FormArray;
  }

  createTraveler(data?: any): FormGroup {
    return this.fb.group({
      name: [data?.name || '', Validators.required],
      age: [data?.age || null, Validators.required],
      gender: [data?.gender || '', Validators.required],
      isEdit: [data?.isEdit ?? true],
    });
  }

  addTraveler(): void {
    this.travelers.push(
      this.createTraveler({
        isEdit: true,
      }),
    );
  }

  editTraveler(index: number): void {
    this.travelers.at(index).patchValue({
      isEdit: true,
    });
  }

  removeTraveler(index: number): void {
    this.travelers.removeAt(index);
  }

  saveTraveler(index: number): void {
    const row = this.travelers.at(index);

    if (row.invalid) {
      row.markAllAsTouched();
      return;
    }

    row.patchValue({
      isEdit: false,
    });
  }
}
