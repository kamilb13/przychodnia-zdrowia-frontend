import { Component } from '@angular/core';
import {MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    MatDrawerContainer,
    SidenavComponent,
    RouterOutlet,
    MatSidenavModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
