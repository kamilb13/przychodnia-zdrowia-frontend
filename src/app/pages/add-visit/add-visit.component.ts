import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {map, Observable, startWith} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Patient {
  id: number;
  name: string;
  surname: string;
  ssn?: string;
}

interface Doctor {
  id: number;
  name: string;
  surname: string;
}

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
    NgForOf
  ],
  templateUrl: './add-visit.component.html',
  styleUrl: './add-visit.component.scss'
})
export class AddVisitComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  protected readonly JSON = JSON;

  private _formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  patientList: any[] = [];
  doctorList: any[] = [];
  filteredOptions!: Observable<any[]>;
  filteredDoctors!: Observable<any[]>;

  isLinear = true;

  visitFormGroup = this._formBuilder.group({
    patient: new FormControl<Patient | null>(null, Validators.required),
    doctor: new FormControl<Doctor | null>(null, Validators.required),
    date: new FormControl<string | null>('', Validators.required),
    time: new FormControl<string | null>('', Validators.required),
  });

  ngOnInit() {
    this.getAllPatients();
    this.getAllDoctors();
    this.filteredOptions = this.visitFormGroup.get('patient')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPatient(value || ''))
    );
    this.filteredDoctors = this.visitFormGroup.get('doctor')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDoctor(value || ''))
    );
  }

  private _filterPatient(value: any): any[] {
    const filterValue = String(value).toLowerCase();
    return this.patientList.filter(patient =>
      patient.name?.toLowerCase().includes(filterValue)
    );
  }

  private _filterDoctor(value: any): any[] {
    if (!value) return this.doctorList;
    const filterValue = String(value).toLowerCase();
    return this.doctorList.filter(doctor =>
      doctor.name?.toLowerCase().includes(filterValue)
    );
  }

  //TODO extract to patient service
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

  //TODO extract to patient service
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
      patient_id: this.visitFormGroup.value.patient?.id,
      doctor_id: this.visitFormGroup.value.doctor?.id,
      date: this.visitFormGroup.value.date,
      time: this.visitFormGroup.value.time,
    };
    console.log(visitData);
    this.http.post('http://localhost:8080/visits', visitData).subscribe({
      next: (response) => {
        this.snackBar.open('Wizyta została pomyślnie zarejestrowana', 'Zamknij', {
          duration: 3000,
        });
        this.stepper.reset();
      },
      error: (error) => {
        console.error('Błąd dodawania wizyty:', error);
        alert("Błąd dodawania wizyty");
      }
    });
  }

  displayPatientFn(patient: any): string {
    return patient ? `${patient.name} ${patient.surname} Pesel: ${patient.ssn}` : '';
  }

  displayDoctorFn(doctor: any): string {
    return doctor ? `${doctor.name} ${doctor.surname}` : '';
  }

  setPatient(patient: Patient) {
    this.visitFormGroup.get('patient')?.setValue(patient);
  }

  setDoctor(doctor: Doctor) {
    this.visitFormGroup.get('doctor')?.setValue(doctor);
  }
}
