import { Component, computed, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-basic-button',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './basic-button.html',
  styleUrl: './basic-button.scss',
})
export class BasicButton {
  text = input.required<string>();
  link = input.required<string>();
}
