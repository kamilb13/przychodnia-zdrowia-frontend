import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';

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
  ],
  templateUrl: './all-patients.component.html',
  styleUrl: './all-patients.component.scss'
})
export class AllPatientsComponent implements OnInit {
  private http = inject(HttpClient);
  patients: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'surname', 'ssn'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getAllPatients()
  }

  getAllPatients() {
    this.http.get<any[]>('http://localhost:8080/patients').subscribe({
      next: (response) => {
        console.log('Pacjenci:', response);
        this.patients = response;
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Błąd pobierania pacjentów:', error);
      }
    });
  }
}
