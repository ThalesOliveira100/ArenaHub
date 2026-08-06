import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from "../logo/logo";

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    Logo
],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  protected direcionarParaLogin() {

  }
}
