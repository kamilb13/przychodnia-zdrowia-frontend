import {Component, inject} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

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

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    surnameCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    ssnCtrl: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern('^[0-9]*$')]],
  });
  isLinear = true;
  protected readonly alert = alert;

  addPatient() {
    //TODO add patient logic
    console.log("Pacjent dodany do systemu.");
  }
}
