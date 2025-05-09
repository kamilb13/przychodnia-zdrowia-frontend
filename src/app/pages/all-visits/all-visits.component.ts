import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-all-visits',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './all-visits.component.html',
  styleUrl: './all-visits.component.scss'
})
export class AllVisitsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  visits: any[] = [];
  displayedColumns: string[] = ['id', 'healthRecord', 'patient', 'doctor', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editingVisit: any = null;

  ngOnInit() {
    this.getAllVisits()
  }

  getAllVisits() {
    this.http.get<any[]>('http://localhost:8080/visits').subscribe({
      next: (response) => {
        console.log('Wizyty: ', response);
        const sortedResponse = response.sort((a, b) => a.id - b.id);
        this.dataSource.data = sortedResponse;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Błąd pobierania wizyt: ', error);
      }
    });
  }

  startEdit(visit: any) {
    this.editingVisit = { ...visit };
  }

  cancelEdit() {
    this.editingVisit = null;
  }

  deleteVisit(visitId: number) {
    this.http.delete(`http://localhost:8080/visits/${visitId}`).subscribe({
      next: (response) => {
        console.log(response)
        this.snackBar.open('Wizyta została pomyślnie usunięta', 'Zamknij', {
          duration: 3000,
        });
        this.getAllVisits();
      },
      error: (error)=> {
        this.snackBar.open('Wystąpił błąd przy usuwaniu wizyty', 'Zamknij', {
          duration: 4000,
        });
      }
    })
  }

  saveVisit() {
    this.http.put(`http://localhost:8080/visits/${this.editingVisit.id}`, this.editingVisit).subscribe({
      next: (response) => {
        this.snackBar.open('Wizyta została zaktualizowana', 'Zamknij', { duration: 3000 });
        const index = this.dataSource.data.findIndex(d => d.id === this.editingVisit.id);
        if (index !== -1) {
          this.dataSource.data[index] = this.editingVisit;
          this.dataSource._updateChangeSubscription();
        }
        this.editingVisit = null;
      },
      error: (error) => {
        console.error('Błąd przy aktualizacji wizyty:', error);
        this.snackBar.open('Błąd przy aktualizacji wizyty', 'Zamknij', { duration: 3000 });
      }
    });
  }
}
