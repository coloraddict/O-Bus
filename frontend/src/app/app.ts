import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Header } from './components/core/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Header, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('O-Bus');

  router = inject(Router);
}
