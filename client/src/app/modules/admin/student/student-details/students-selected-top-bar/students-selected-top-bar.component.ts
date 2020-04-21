import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-students-selected-top-bar',
    templateUrl: './students-selected-top-bar.component.html',
    styleUrls: ['./students-selected-top-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentsSelectedTopBarComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedContacts: boolean;
    isIndeterminate: boolean;
    selectedContacts: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {MatDialog} _matDialog
     */
    constructor(public _matDialog: MatDialog) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this._contactsService.onSelectedContactsChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((selectedContacts) => {
        //         this.selectedContacts = selectedContacts;
        //         setTimeout(() => {
        //             this.hasSelectedContacts = selectedContacts.length > 0;
        //             this.isIndeterminate =
        //                 selectedContacts.length !==
        //                     this._contactsService.contacts.length &&
        //                 selectedContacts.length > 0;
        //         }, 0);
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Select all
     */
    selectAll(): void {
        // this._contactsService.selectContacts();
    }

    /**
     * Deselect all
     */
    deselectAll(): void {
        // this._contactsService.deselectContacts();
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false
            }
        );

        this.confirmDialogRef.componentInstance.confirmMessage =
            'Are you sure you want to delete all selected contacts?';

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // this._contactsService.deleteSelectedContacts();
            }
            this.confirmDialogRef = null;
        });
    }
}
