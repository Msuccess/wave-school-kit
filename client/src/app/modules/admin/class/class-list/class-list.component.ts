import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ClassService } from '../services/class.service';
import { ClassModel } from '../models/class.model';
import { NotificationService } from 'app/modules/shared/services/notification.service';

@Component({
    selector: 'app-class-list',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClassListComponent implements OnInit {
    subjects: any;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['checkbox', 'name', 'teacher', 'subjects', 'buttons'];
    selectedSubjects: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private _classService: ClassService,
        public _matDialog: MatDialog,
        private _notification: NotificationService
    ) {}

    ngOnInit() {
        this._classService.onClassesChanged.subscribe(
            (res) => {
                if (res === true) {
                    this.getClass();
                    this._classService.onClassesChanged.next(false);
                } else {
                    this.getClass();
                }
            },
            (err) => {}
        );
    }

    getClass() {
        this._classService.getClasses().subscribe(
            (res: any) => {
                this.checkboxes = {};
                this.dataSource = new MatTableDataSource(res.data);
            },
            (err) => {}
        );
    }

    deleteClass(classId: string) {
        // this.confirmDialogRef = this._matDialog.open(
        //     FuseConfirmDialogComponent,
        //     {
        //         disableClose: false
        //     }
        // );
        // this.confirmDialogRef.componentInstance.confirmMessage =
        //     'Are you sure you want to delete this subject?';
        // this.confirmDialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //         this._classService.deleteSubject(subjectId).subscribe(
        //             (res) => {
        //                 this._notification.alert(
        //                     _classService.SUBJECT.subject_deleted,
        //                     'success'
        //                 );
        //                 this._classService.onSubjectsChanged.next(true);
        //             },
        //             (err) => {}
        //         );
        //     }
        //     this.confirmDialogRef = null;
        // });
    }

    editClass(classData: ClassModel) {
        // this.dialogRef = this._matDialog.open(SubjectFormComponent, {
        //     panelClass: 'contact-form-dialog',
        //     data: {
        //         subject: subjectData,
        //         action: 'edit'
        //     }
        // });
    }
}
