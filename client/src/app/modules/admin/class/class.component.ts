import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ClassFormComponent } from './class-form/class-form.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClassComponent implements OnInit {
    dialogRef: any;

    constructor(private _matDialog: MatDialog) {}

    ngOnInit() {}

    addClass() {
        this.dialogRef = this._matDialog.open(ClassFormComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });
    }
}
