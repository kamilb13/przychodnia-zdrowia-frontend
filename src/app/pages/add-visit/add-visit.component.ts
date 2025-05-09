import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {map, Observable, startWith} from 'rxjs';

@Component({
  selector: 'app-add-visit',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatStepLabel,
    MatFormFieldModule,
    MatInputModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    AsyncPipe,
    NgForOf,
  ],
  templateUrl: './add-visit.component.html',
  styleUrl: './add-visit.component.scss'
})
export class AddVisitComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  private _formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);

  patientControl = new FormControl('');
  doctorControl = new FormControl('');
  patientList: any[] = [];
  doctorList: any[] = [];
  filteredOptions!: Observable<any[]>;
  filteredDoctors!: Observable<any[]>;

  ngOnInit() {
    this.getAllPatients();
    this.getAllDoctors();
    this.filteredOptions = this.patientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.filteredDoctors = this.doctorControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDoctor(value || ''))
    );
  }

  private _filter(value: any): any[] {
    const filterValue = value;
    return this.patientList.filter(patient => patient);
  }

  private _filterDoctor(value: any): any[] {
    const filterValue = value;
    return this.doctorList.filter(doctor => doctor);
  }

  firstFormGroup = this._formBuilder.group({
    patient: this.patientControl,
    doctor: this.doctorControl,
    date: ['', Validators.required],
  });

  isLinear = true;

  getAllPatients() {
    this.http.get<any[]>('http://localhost:8080/patients').subscribe({
      next: (response) => {
        this.patientList = response.sort((a, b) => a.id - b.id);
      },
      error: (error) => {
        console.error('Błąd pobierania pacjentów:', error);
      }
    });
  }

  getAllDoctors() {
    this.http.get<any[]>('http://localhost:8080/doctors').subscribe({
      next: (response) => {
        this.doctorList = response.sort((a, b) => a.id - b.id);
      },
      error: (error) => {
        console.error('Błąd pobierania doktorów:', error);
      }
    });
  }

  addVisit() {
    const visitData = {
      name: this.firstFormGroup.value.patient,
      surname: this.firstFormGroup.value.doctor,
      date: this.firstFormGroup.value.date,
    };
    this.http.post('http://localhost:8080/visits', visitData).subscribe({
      next: (response) => {
        console.log('Wizyta dodana:', response);
      },
      error: (error) => {
        console.error('Błąd dodawania wizyty:', error);
        //TODO dodac obsluge bledow widoczna dla uzytkownika
      }
    });
  }

  displayFn(patient: any): string {
    return patient ? `${patient.name} ${patient.surname} Pesel: ${patient.ssn}` : '';
  }

  displayDoctorFn(doctor: any): string {
    return doctor ? `${doctor.name} ${doctor.surname}` : '';
  }

  protected readonly JSON = JSON;
}
