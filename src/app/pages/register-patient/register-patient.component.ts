import {Component, inject, ViewChild} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-patient',
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
    NgIf,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.scss'
})
export class RegisterPatientComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  private snackBar = inject(MatSnackBar);
  private _formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    surnameCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    ssnCtrl: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern('^[0-9]*$')]],
  });
  isLinear = true;

  addPatient() {
    const patientData = {
      name: this.firstFormGroup.value.firstCtrl,
      surname: this.firstFormGroup.value.surnameCtrl,
      ssn: this.secondFormGroup.value.ssnCtrl
    };
    this.http.post('http://localhost:8080/patients', patientData).subscribe({
      next: (response) => {
        this.snackBar.open('Pacjent został pomyślnie dodany', 'Zamknij', {
          duration: 3000,
        });
        this.firstFormGroup.reset();
        this.stepper.reset();
      },
      error: (error) => {
        console.error('Błąd dodawania pacjenta:', error);
        //TODO dodac obsluge bledow widoczna dla uzytkownika
      }
    });
  }
}
