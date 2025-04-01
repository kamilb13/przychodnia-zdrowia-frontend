import {Component, inject} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';

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
  ],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.scss'
})
export class RegisterPatientComponent {
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
}
