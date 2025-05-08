import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-doctor',
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
  ],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss'
})
export class AddDoctorComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  private _formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    surnameCtrl: ['', Validators.required],
  });
  isLinear = true;

  addDoctor() {
    const doctorData = {
      name: this.firstFormGroup.value.firstCtrl,
      surname: this.firstFormGroup.value.surnameCtrl,
    };
    this.http.post('http://localhost:8080/doctors', doctorData).subscribe({
      next: (response) => {
        this.snackBar.open('Doktor został pomyślnie dodany', 'Zamknij', {
          duration: 3000,
        });
        this.firstFormGroup.reset();
        this.stepper.reset();
      },
      error: (error) => {
        console.error('Błąd dodawania doktora:', error);
        //TODO dodac obsluge bledow widoczna dla uzytkownika
      }
    });
  }
}
