import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { TeacherService } from '../../services/teacher.service';
import { TeacherModel, UpdateTeacherModel } from '../../models/teacher.model';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { applicationMessages } from 'app/core/constants/applicationMessages';
import { TeacherFormComponent } from './../../teacher-form/teacher-form.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TeacherListComponent implements OnInit {

  subjects: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['checkbox', 'firstname', 'lastname', 'buttons'];
  selectedSubjects: any[];
  checkboxes: {};
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private _teacherService: TeacherService,
    public _matDialog: MatDialog,
    private _notification: NotificationService
  ) { }

  ngOnInit() {
    this._teacherService.runOnTeachersChanged.subscribe(
      (res) => {
        if (res === true) {
          this.getTeachers();
          this._teacherService.onTeachersChanged.next(false);
        } else {
          this.getTeachers();
        }
      },
      (err) => { }
    );
  }


  getTeachers() {
    this._teacherService.getTeachers().subscribe(
      (res: any) => {
        this.checkboxes = {};
        this.dataSource = new MatTableDataSource(res.data);
      },
      (err) => { }
    );
  }

  deleteSubject(teacherId: string) {
    this.confirmDialogRef = this._matDialog.open(
      FuseConfirmDialogComponent,
      {
        disableClose: false
      }
    );

    this.confirmDialogRef.componentInstance.confirmMessage =
      'Are you sure you want to delete this teacher?';

    this.confirmDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._teacherService.deleteTeacher(teacherId).subscribe(
          (res) => {
            this._notification.alert(
              applicationMessages.TEACHER.teacher_deleted,
              'success'
            );
            this._teacherService.onTeachersChanged.next(true);
          },
          (err) => { }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  editTeacher(teacherData: UpdateTeacherModel) {
    this.dialogRef = this._matDialog.open(TeacherFormComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        teacher: teacherData,
      }
    });
  }

}
