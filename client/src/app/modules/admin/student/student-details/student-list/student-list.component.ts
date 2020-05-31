import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Subject, Observable } from 'rxjs';
// import { StudentService } from 'app/modules/admin/services/student.service';
import { takeUntil } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { fuseAnimations } from '@fuse/animations';
import { applicationMessages } from 'app/core/constants/applicationMessages';
import { MatTableDataSource } from '@angular/material';
import { AdminStudentService } from '../../services/admin-student.service';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentListComponent implements OnInit {
    subjects: any;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['checkbox', 'firstname', 'lastname', 'buttons'];
    selectedStudents: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private _studentService: AdminStudentService, public _matDialog: MatDialog, private _notification: NotificationService, private _router: Router) {}

    ngOnInit() {
        this._studentService.runOnStudentsChanged.subscribe(
            (res) => {
                if (res === true) {
                    this.getStudents();
                    this._studentService.onStudentsChanged.next(false);
                } else {
                    this.getStudents();
                }
            },
            (err) => {}
        );
    }

    getStudents() {
        this._studentService.getStudentsList().subscribe(
            (res: any) => {
                this.checkboxes = {};
                this.dataSource = new MatTableDataSource(res.data);
                console.log(res.data);
            },
            (err) => {}
        );
    }

    deleteStudent(studentId: string) {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this student?';

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._studentService.deleteStudent(studentId).subscribe(
                    (res) => {
                        this._notification.alert(applicationMessages.STUDENT.student_deleted, 'success');
                        this._studentService.onStudentsChanged.next(true);
                    },
                    (err) => {}
                );
            }
            this.confirmDialogRef = null;
        });
    }

    editStudent(studentId: string) {
        this._router.navigate(['/admin/student/edit', studentId]);
    }
}
