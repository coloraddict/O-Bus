import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { passwordValidator } from '../../../utils/password.validator';

@Component({
  selector: 'app-register',
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  authService = inject(AuthService);
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required],
    });
  }

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe((response) => {
      this.router.navigateByUrl('/login');
    });
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }
}
