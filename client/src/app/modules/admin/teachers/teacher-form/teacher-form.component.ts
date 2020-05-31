import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { applicationMessages } from 'app/core/constants/applicationMessages';
import { BehaviorSubject } from 'rxjs';
import { TeacherService } from '../services/teacher.service';
import { TeacherModel, UpdateTeacherModel } from '../models/teacher.model';
import { LocalDataService } from 'app/modules/shared/services/local-data.service';
import { ClassService } from '../../class/services/class.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TeacherFormComponent implements OnInit {

  action: any;
  dialogTitle: string;
  teachers: any;
  hasFormErrors: Boolean = false;
  teacherForm: FormGroup;
  teacherModel = {} as UpdateTeacherModel;
  showProgressBar$ = new BehaviorSubject<boolean>(false);
  form_data: any;
  getSelectedTeacherId: string;
  selected: string;

  classList = [];
  genderList = [];
  religionList = [];

  constructor(
    public matDialogRef: MatDialogRef<TeacherFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _teacherService: TeacherService,
    private _notification: NotificationService,
    private _localDataService: LocalDataService,
    private _classService: ClassService,
  ) {
    // Set the defaults
    this.action = _data.action;
    this.form_data = _data.teacher;

    this.dialogTitle = 'Edit Teacher';
    this.teacherModel = _data.teacher;
    this.getSelectedTeacherId = _data.teacher.id;
  }


  createTeacherForm() {
    // Reactive Form
    this.teacherForm = this._formBuilder.group({

      id: [this.teacherModel.id],
      firstname: [this.teacherModel.firstname],
      lastname: [this.teacherModel.lastname],
      gender: [this.teacherModel.gender],
      religion: [this.teacherModel.religion],

      user: this._formBuilder.group({
        id: [this.teacherModel.user.id],
        levelId: [this.teacherModel.user.levelId],
        username: [this.teacherModel.user.username],
        email: [this.teacherModel.user.email, Validators.email,],
        phonenumber: [this.teacherModel.user.phonenumber, [Validators.maxLength(10)]],
        avatar: [this.teacherModel.user.avatar]
      }),

    });


  }


  loadAllServices() {

    this._localDataService.getGenders().subscribe((res: any) => {
      this.genderList = res;
    });

    this._localDataService.getReligions().subscribe((res: any) => {
      this.religionList = res;
    });

    this._classService.getClasses().subscribe((res: any) => {
      this.classList = res.data;
    });
  }


  updateTeacher(formDetails) {
    console.log(this.teacherForm.value);
    this._teacherService
      .updateTeacher(this.getSelectedTeacherId, formDetails.value)
      .subscribe((res) => {
        this._notification.alert(
          applicationMessages.TEACHER.teacher_updated,
          'success'
        );
        this.matDialogRef.close();
        this._teacherService.onTeachersChanged.next(true);
      });
  }

  ngOnInit() {
    this.loadAllServices();
    this.createTeacherForm();
  }

}
