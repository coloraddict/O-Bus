import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { TabsModule } from 'primeng/tabs';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule, FileUploadModule, TabsModule, SelectModule, TableModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['John'],
      lastName: ['Doe'],
      email: ['john@example.com'],
      mobile: ['9876543210'],
      theme: ['light'],
      language: ['English'],
      notifications: [true],
      smsNotifications: [true],
      preferredSeat: ['Window'],
    });
  }

  uploadImage(event: any) {
    console.log(event.files);
  }

  saveProfile() {
    console.log(this.profileForm.value);
  }
}
