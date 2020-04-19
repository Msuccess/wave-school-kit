import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TeachersService } from '../../services/teachers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubjectModel } from '../../models/subject.model';
import { SubjectService } from '../../services/subject.service';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { applicationMessages } from 'app/core/constants/applicationMessages';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-subject-form',
    templateUrl: './subject-form.component.html',
    styleUrls: ['./subject-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SubjectFormComponent implements OnInit {
    action: any;
    dialogTitle: string;
    subjects: any;
    hasFormErrors: Boolean = false;
    subjectForm: FormGroup;
    subjectModel = {} as SubjectModel;
    teachersList: any;
    showProgressBar$ = new BehaviorSubject<boolean>(false);

    constructor(
        private _teachersList: TeachersService,
        public matDialogRef: MatDialogRef<SubjectFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _subjectService: SubjectService,
        private _notification: NotificationService
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Contact';
            this.subjects = this.subjectModel;
        } else {
            this.dialogTitle = 'New Subject';
            this.subjects = new SubjectModel({});
        }

        this._teachersList.getTeachersList().subscribe(
            (res) => {
                this.teachersList = res;
            },
            (err) => {}
        );
    }

    createSubjectForm() {
        this.subjectForm = this._formBuilder.group({
            name: [this.subjectModel.name, Validators.required],
            subjectCode: [this.subjectModel.subjectCode, Validators.required]
        });
    }

    saveSubject() {
        this.showProgressBar$.next(true);
        this._subjectService.addSubject(this.subjectForm.value).subscribe(
            (res) => {
                this._notification.alert(
                    applicationMessages.SUBJECT.subject_saved,
                    'success'
                );
                this.matDialogRef.close();
                this.showProgressBar$.next(false);
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
    }

    ngOnInit() {
        this.createSubjectForm();
    }
}
