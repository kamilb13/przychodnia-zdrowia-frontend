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
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

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
        NgIf,
        MatInput,
        FormsModule,
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

    editingDoctor: any = null;

    ngOnInit() {
        this.getAllDoctors()
    }

    getAllDoctors() {
        this.http.get<any[]>('http://localhost:8080/doctors').subscribe({
            next: (response) => {
                console.log('Doktorzy:', response);
                // this.patients = response;
                const sortedResponse = response.sort((a, b) => a.id - b.id);
                this.dataSource.data = sortedResponse;
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Błąd pobierania doktorów:', error);
            }
        });
    }

    startEdit(doctor: any) {
        this.editingDoctor = { ...doctor };
    }

    cancelEdit() {
        this.editingDoctor = null;
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

    saveDoctor() {
        this.http.put(`http://localhost:8080/doctors/${this.editingDoctor.id}`, this.editingDoctor).subscribe({
            next: (response) => {
                this.snackBar.open('Doktor został zaktualizowany', 'Zamknij', { duration: 3000 });
                const index = this.dataSource.data.findIndex(d => d.id === this.editingDoctor.id);
                if (index !== -1) {
                    this.dataSource.data[index] = this.editingDoctor;
                    this.dataSource._updateChangeSubscription();
                }
                this.editingDoctor = null;
            },
            error: (error) => {
                console.error('Błąd przy aktualizacji doktora:', error);
                this.snackBar.open('Błąd przy aktualizacji doktora', 'Zamknij', { duration: 3000 });
            }
        });
    }
}

