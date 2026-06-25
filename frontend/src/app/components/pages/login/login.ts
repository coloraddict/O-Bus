import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(AuthService);

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigateByUrl('');
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
