import {Component, inject} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-visit',
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
  templateUrl: './add-visit.component.html',
  styleUrl: './add-visit.component.scss'
})
export class AddVisitComponent {
  private _formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    surnameCtrl: ['', Validators.required],
  });
  isLinear = true;

  addVisit() {
    const visitData = {
      name: this.firstFormGroup.value.firstCtrl,
      surname: this.firstFormGroup.value.surnameCtrl,
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
}
