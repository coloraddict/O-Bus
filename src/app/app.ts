import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Header } from './components/core/header/header';
import { BookingPanel } from './components/body/booking-panel/booking-panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Header, BookingPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('O-Bus');
}
