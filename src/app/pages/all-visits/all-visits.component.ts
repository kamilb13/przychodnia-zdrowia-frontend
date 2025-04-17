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
    MatTable
  ],
  templateUrl: './all-visits.component.html',
  styleUrl: './all-visits.component.scss'
})
export class AllVisitsComponent implements OnInit {
  private http = inject(HttpClient);
  visits: any[] = [];
  displayedColumns: string[] = ['id', 'healthRecord', 'patient', 'doctor'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getAllVisits()
  }

  getAllVisits() {
    this.http.get<any[]>('http://localhost:8080/visits').subscribe({
      next: (response) => {
        console.log('Wizyty: ', response);
        this.visits = response;
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Błąd pobierania wizyt: ', error);
      }
    });
  }
}
