import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TeacherFormComponent } from './../teacher-form/teacher-form.component';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TeacherDetailsComponent implements OnInit {

  dialogRef: any;

  constructor(private _matDialog: MatDialog) { }

  ngOnInit() { }

  addTeacher() {
    this.dialogRef = this._matDialog.open(TeacherFormComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new'
      }
    });
  }

}
