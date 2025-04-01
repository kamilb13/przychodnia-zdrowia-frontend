import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {VisitsComponent} from './pages/visits/visits.component';
import {RegisterPatientComponent} from './pages/register-patient/register-patient.component';
import {AddDoctorComponent} from './pages/add-doctor/add-doctor.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'visits', component: VisitsComponent },
      { path: 'register-patient', component: RegisterPatientComponent },
      { path: 'add-doctor', component: AddDoctorComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
];
