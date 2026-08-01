import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { MatDividerModule } from '@angular/material/divider';
import { MainPage } from './shared/components/main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    MainPage,
    MatDividerModule,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ArenaHub');
}
