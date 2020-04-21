import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { SubjectService } from '../service/subject.service';
import { SubjectModel } from '../models/subject.model';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { applicationMessages } from 'app/core/constants/applicationMessages';
import { SubjectFormComponent } from '../subject-form/subject-form.component';

@Component({
    selector: 'app-subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SubjectListComponent implements OnInit {
    subjects: any;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['checkbox', 'name', 'code', 'buttons'];
    selectedSubjects: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private _subjectService: SubjectService,
        public _matDialog: MatDialog,
        private _notification: NotificationService
    ) {}

    ngOnInit() {
        this._subjectService.runOnSubjectsChanged.subscribe(
            (res) => {
                if (res === true) {
                    this.getSubjects();
                    this._subjectService.onSubjectsChanged.next(false);
                } else {
                    this.getSubjects();
                }
            },
            (err) => {}
        );
    }

    getSubjects() {
        this._subjectService.getSubjects().subscribe(
            (res: any) => {
                this.checkboxes = {};
                this.dataSource = new MatTableDataSource(res.data);
            },
            (err) => {}
        );
    }

    deleteSubject(subjectId: string) {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false
            }
        );

        this.confirmDialogRef.componentInstance.confirmMessage =
            'Are you sure you want to delete this subject?';

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._subjectService.deleteSubject(subjectId).subscribe(
                    (res) => {
                        this._notification.alert(
                            applicationMessages.SUBJECT.subject_deleted,
                            'success'
                        );
                        this._subjectService.onSubjectsChanged.next(true);
                    },
                    (err) => {}
                );
            }
            this.confirmDialogRef = null;
        });
    }

    editSubject(subjectData: SubjectModel) {
        this.dialogRef = this._matDialog.open(SubjectFormComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                subject: subjectData,
                action: 'edit'
            }
        });
    }
}
