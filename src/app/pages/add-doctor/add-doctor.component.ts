import {Component, inject} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';

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
  private _formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
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
        console.log('Doktor dodany:', response);
        alert("Dodano doktora")
      },
      error: (error) => {
        console.error('Błąd dodawania doktora:', error);
        //TODO dodac obsluge bledow widoczna dla uzytkownika
      }
    });
  }
}
