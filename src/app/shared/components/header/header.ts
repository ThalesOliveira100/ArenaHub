import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  protected direcionarParaLogin() {

  }
}
