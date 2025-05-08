import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {AddVisitComponent} from './pages/add-visit/add-visit.component';
import {RegisterPatientComponent} from './pages/register-patient/register-patient.component';
import {AllPatientsComponent} from './pages/all-patients/all-patients.component';
import {AddDoctorComponent} from './pages/add-doctor/add-doctor.component';
import {AllDoctorsComponent} from './pages/all-doctors/all-doctors.component';
import {AllVisitsComponent} from './pages/all-visits/all-visits.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'visits', component: AllVisitsComponent }, //TODO fix visits first
  // { path: 'visits/new', component: AddVisitComponent }, // TODO fix visits first
  { path: 'patients', component: AllPatientsComponent },
  { path: 'patients/new', component: RegisterPatientComponent },
  { path: 'doctors', component: AllDoctorsComponent },
  { path: 'doctors/new', component: AddDoctorComponent },
];

