import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  register(user: any) {
    return this.http.post('http://localhost:3000/api/auth/register', user);
  }

  login(user: any) {
    return this.http.post('http://localhost:3000/api/auth/login', user);
  }
}
