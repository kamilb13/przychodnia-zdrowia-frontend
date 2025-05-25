import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-all-patients',
  imports: [
    MatPaginator,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatTable,
    ReactiveFormsModule,
    MatInput,
    NgIf,
    FormsModule,
    MatButton,
  ],
  templateUrl: './all-patients.component.html',
  styleUrl: './all-patients.component.scss'
})
export class AllPatientsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  patients: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'surname', 'ssn', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editingPatient: any = null;

  ngOnInit() {
    this.getAllPatients()
  }

  getAllPatients() {
    this.http.get<any[]>('http://localhost:8080/patients').subscribe({
      next: (response) => {
        console.log('Pacjenci:', response);
        const sortedResponse = response.sort((a, b) => a.id - b.id);
        this.dataSource.data = sortedResponse;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Błąd pobierania pacjentów:', error);
      }
    });
  }

  startEdit(patient: any) {
    this.editingPatient = {...patient};
  }

  cancelEdit() {
    this.editingPatient = null;
  }

  deletePatient(patientId: number) {
    this.http.delete(`http://localhost:8080/patients/${patientId}`).subscribe({
      next: (response) => {
        console.log(response)
        this.snackBar.open('Pacjent został pomyślnie usunięty', 'Zamknij', {
          duration: 3000,
        });
        // this.patients = this.patients.filter((patient) => patient.id !== doctorId);
        this.getAllPatients();
      },
      error: (error) => {
        this.snackBar.open('Wystąpił błąd przy usuwaniu pacjenta', 'Zamknij', {
          duration: 4000,
        });
      }
    })
  }

  savePatient() {
    this.http.put(`http://localhost:8080/patients/${this.editingPatient.id}`, this.editingPatient).subscribe({
      next: (response) => {
        this.snackBar.open('Pacjent został zaktualizowany', 'Zamknij', {duration: 3000});
        const index = this.dataSource.data.findIndex(d => d.id === this.editingPatient.id);
        if (index !== -1) {
          this.dataSource.data[index] = this.editingPatient;
          this.dataSource._updateChangeSubscription();
        }
        this.editingPatient = null;
      },
      error: (error) => {
        console.error('Błąd przy aktualizacji pacjenta:', error);
        this.snackBar.open('Błąd przy aktualizacji pacjenta', 'Zamknij', {duration: 3000});
      }
    });
  }
}




