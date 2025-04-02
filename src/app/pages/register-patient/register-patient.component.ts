import {Component, inject} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';

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
    //TODO add patient logic
    console.log("Imie pacjenta: ", this.firstFormGroup.value.firstCtrl);
    console.log("Nazwisko pacjenta: ", this.firstFormGroup.value.surnameCtrl);
    console.log("Nazwisko pacjenta: ", this.secondFormGroup.value.ssnCtrl);

    const patientData = {
      name: this.firstFormGroup.value.firstCtrl,
      surname: this.firstFormGroup.value.surnameCtrl,
      ssn: this.secondFormGroup.value.ssnCtrl
    };
    console.log(patientData);
    /*
    {
  "name": "Jan",
  "surname": "Nowak",
  "ssn": "11111111120"
}
     */
    this.http.post('http://localhost:8080/register-patient', patientData).subscribe({
      next: (response) => {
        console.log('Pacjent dodany:', response);
      },
      error: (error) => {
        console.error('Błąd dodawania pacjenta:', error);
        //TODO dodac obsluge bledow widoczna dla uzytkownika
      }
    });
  }
}
