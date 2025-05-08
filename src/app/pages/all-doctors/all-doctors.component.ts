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
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

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
        MatHeaderCellDef,
        MatButton,
    ],
    templateUrl: './all-doctors.component.html',
    styleUrl: './all-doctors.component.scss'
})

export class AllDoctorsComponent implements OnInit {
    private snackBar = inject(MatSnackBar);
    private http = inject(HttpClient);
    patients: any[] = [];
    displayedColumns: string[] = ['id', 'name', 'surname', 'actions'];
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

    deleteDoctor(doctorId: number) {
        this.http.delete(`http://localhost:8080/doctors/${doctorId}`).subscribe({
            next: (response) => {
                console.log(response)
                this.snackBar.open('Doktor został pomyślnie usunięty', 'Zamknij', {
                    duration: 3000,
                });
                // this.patients = this.patients.filter((patient) => patient.id !== doctorId);
                this.getAllDoctors();
            },
            error: (error)=> {
                this.snackBar.open('Wystąpił błąd przy usuwaniu doktora', 'Zamknij', {
                    duration: 4000,
                });
            }
        })
    }
}

