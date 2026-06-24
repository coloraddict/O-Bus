import { Routes } from '@angular/router';
import { Register } from './components/pages/register/register';
import { Home } from './components/pages/home/home';
import { Login } from './components/pages/login/login';
import { Search } from './components/pages/search/search';
import { User } from './components/pages/user/user';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'search', component: Search },
  { path: 'user', component: User },
];
