import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
