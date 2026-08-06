import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Header } from '../../shared/components/header/header';
import { MainPage } from '../../shared/components/main-page/main-page';

@Component({
  selector: 'app-homepage',
  imports: [
    Header,
    MainPage,
    Footer
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {}
