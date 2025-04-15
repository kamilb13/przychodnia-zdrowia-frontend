import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';

@Component({
  selector: 'app-all-doctors',
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
        MatHeaderCellDef
    ],
  templateUrl: './all-doctors.component.html',
  styleUrl: './all-doctors.component.scss'
})

export class AllDoctorsComponent implements OnInit {
  private http = inject(HttpClient);
  patients: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'surname'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getAllDoctors()
  }

  getAllDoctors() {
    this.http.get<any[]>('http://localhost:8080/doctors').subscribe({
      next: (response) => {
        console.log('Doktorzy:', response);
        this.patients = response;
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Błąd pobierania doktorów:', error);
      }
    });
  }
}

