import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { SubjectService } from '../../services/subject.service';
import { SubjectModel } from '../../models/subject.model';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { SubjectFormComponent } from '../subject-form/subject-form.component';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';

@Component({
    selector: 'app-subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SubjectListComponent implements OnInit {
    // Private
    private _unsubscribeAll: Subject<any>;

    subjects: any;
    // dataSource = new MatTableDataSource<SubjectModel>();
    dataSource = new MatTableDataSource<SubjectModel>();
    displayedColumns = ['checkbox', 'name', 'code', 'buttons'];
    selectedSubjects: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private _subjectService: SubjectService,
        public _matDialog: MatDialog
    ) {}

    // getSubjects() {
    //     this._subjectService.getSubjects().subscribe(
    //         (res: any) => {
    //             this.dataSource.data = res.data as SubjectModel[];
    //             this.checkboxes = {};
    //         },
    //         (err) => {
    //             console.log(err);
    //         }
    //     );
    // }

    ngOnInit() {
        this._subjectService.getSubjects();

        this._subjectService.onSelectedSubjectsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((subjects) => {
                this.subjects = subjects;

                this.checkboxes = {};
                subjects.map((subject) => {
                    this.checkboxes[subject.id] = false;
                });
            });

        this._subjectService.onSubjectDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedSubject) => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedSubject.includes(id);
                }
                this.selectedSubjects = selectedSubject;
            });

        // this._contactsService.onUserDataChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(user => {
        //         this.user = user;
        //     });

        this._subjectService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._subjectService.deselectSubjects();
            });
    }

    // editContact(contact): void
    // {
    //     this.dialogRef = this._matDialog.open(SubjectFormComponent, {
    //         panelClass: 'contact-form-dialog',
    //         data      : {
    //             contact: contact,
    //             action : 'edit'
    //         }
    //     });

    //     this.dialogRef.afterClosed()
    //         .subscribe(response => {
    //             if ( !response )
    //             {
    //                 return;
    //             }
    //             const actionType: string = response[0];
    //             const formData: FormGroup = response[1];
    //             switch ( actionType )
    //             {
    //                 /**
    //                  * Save
    //                  */
    //                 case 'save':

    //                     this._contactsService.updateContact(formData.getRawValue());

    //                     break;
    //                 /**
    //                  * Delete
    //                  */
    //                 case 'delete':

    //                     this.deleteContact(contact);

    //                     break;
    //             }
    //         });
    // }

    /**
     * Delete Contact
     */
    // deleteContact(contact): void
    // {
    //     this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
    //         disableClose: false
    //     });

    //     this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    //     this.confirmDialogRef.afterClosed().subscribe(result => {
    //         if ( result )
    //         {
    //             this._contactsService.deleteContact(contact);
    //         }
    //         this.confirmDialogRef = null;
    //     });

    // }

    /**
     * On selected change
     *
     * @param contactId
     */
    // onSelectedChange(contactId): void
    // {
    //     this._contactsService.toggleSelectedContact(contactId);
    // }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

export class FilesDataSource extends DataSource<any> {
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(private _subjectService: SubjectService) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._subjectService.onSubjectsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {}
}
