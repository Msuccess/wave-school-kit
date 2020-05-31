import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { applicationMessages } from 'app/core/constants/applicationMessages';
import { TeacherService } from './../services/teacher.service';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { TeacherModel } from '../models/teacher.model';
import { ClassService } from '../../class/services/class.service';
import { LocalDataService } from 'app/modules/shared/services/local-data.service';

@Component({
  selector: 'app-create-teacher-form',
  templateUrl: './create-teacher-form.component.html',
  styleUrls: ['./create-teacher-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateTeacherFormComponent implements OnInit {

  classList = [];
  genderList = [];
  religionList = [];

  teachers: any;
  teacherForm: FormGroup;
  teacherModel = {} as TeacherModel;
  showProgressBar$ = new BehaviorSubject<boolean>(false);
  route = Router;

  constructor(
    private _formBuilder: FormBuilder,
    private _teacherService: TeacherService,
    private _notification: NotificationService,
    private _localDataService: LocalDataService,
    private _classService: ClassService,
    private _router: Router
  ) {

    //Set the defaults
    this.teachers = new TeacherModel({});

  }


  createTeacherForm() {
    // Reactive Form
    this.teacherForm = this._formBuilder.group({
      levelId: [this.teacherModel.levelId, Validators.required],
      firstname: [this.teacherModel.firstname, Validators.required],
      lastname: [this.teacherModel.lastname, Validators.required],
      username: [this.teacherModel.username, Validators.required],
      password: [this.teacherModel.password, Validators.required],
      email: [this.teacherModel.email, [Validators.required, Validators.email]],
      phonenumber: [this.teacherModel.phonenumber, [Validators.required, Validators.maxLength(10)]],
      gender: [this.teacherModel.gender, Validators.required],
      religion: [this.teacherModel.religion, Validators.required,]
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

  saveTeacher() {
    this.showProgressBar$.next(true);
    this._teacherService.addTeacher(this.teacherForm.value).subscribe(
      (res) => {
        this._notification.alert(
          applicationMessages.TEACHER.teacher_saved,
          'success'
        );
        this.showProgressBar$.next(false);
        this._teacherService.onTeachersChanged.next(true);
        this._router.navigate(['admin/teacher']);
      },
      (err) => {
        if (err.message.includes('Http failure response')) {
          this._notification.alert(
            applicationMessages.SHARED.internetConnection,
            'error'
          );
        }
        this.showProgressBar$.next(false);
      }
    );
    console.log(this.teacherForm.value);
  }

  ngOnInit(): void {
    this.loadAllServices();
    this.createTeacherForm();
  }


}
