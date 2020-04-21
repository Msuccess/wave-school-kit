import { ClassFormComponent } from './../class-form/class-form.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ClassService } from '../services/class.service';
import { ClassModel } from '../models/class.model';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { applicationMessages } from 'app/core/constants/applicationMessages';

@Component({
    selector: 'app-class-list',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        fuseAnimations,
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            )
        ])
    ]
})
export class ClassListComponent implements OnInit {
    subjects: any;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['checkbox', 'name', 'teacher', 'buttons'];
    expandedElement: ClassModel | null;
    selection = new SelectionModel<ClassModel>(true, []);
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
        this._classService.runOnClassesChanged.subscribe(
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
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false
            }
        );
        this.confirmDialogRef.componentInstance.confirmMessage =
            'Are you sure you want to delete this Class?';
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._classService.deleteClass(classId).subscribe(
                    (res) => {
                        this._notification.alert(
                            applicationMessages.CLASS.class_deleted,
                            'success'
                        );
                        this._classService.onClassesChanged.next(true);
                    },
                    (err) => {}
                );
            }
            this.confirmDialogRef = null;
        });
    }

    editClass(classData: ClassModel) {
        this.dialogRef = this._matDialog.open(ClassFormComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                subject: classData,
                action: 'edit'
            }
        });
    }
}
