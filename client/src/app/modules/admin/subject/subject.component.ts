import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SubjectComponent implements OnInit {
    dialogRef: any;

    constructor(private _matDialog: MatDialog) {}

    ngOnInit() {}

    addSubject() {
        this.dialogRef = this._matDialog.open(SubjectFormComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });

        // this.dialogRef.afterClosed()
        //     .subscribe((response: FormGroup) => {
        //         if ( !response )
        //         {
        //             return;
        //         }

        //         this._contactsService.updateContact(response.getRawValue());
        //     });
    }
}
