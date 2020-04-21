import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {
    MatTableDataSource,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ClassModel } from '../models/class.model';
import { ClassService } from '../services/class.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { applicationMessages } from 'app/core/constants/applicationMessages';

@Component({
    selector: 'app-class-form',
    templateUrl: './class-form.component.html',
    styleUrls: ['./class-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClassFormComponent implements OnInit {
    action: any;
    dialogTitle: string;
    classes: any;
    hasFormErrors: Boolean = false;
    classForm: FormGroup;
    classModel = {} as ClassModel;
    showProgressBar$ = new BehaviorSubject<boolean>(false);
    form_data: any;
    getSelectedClassesId: string;

    constructor(
        public matDialogRef: MatDialogRef<ClassFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _classService: ClassService,
        private _notification: NotificationService
    ) {
        // Set the defaults
        this.action = _data.action;
        this.form_data = _data.subject;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Class';
            this.classModel = _data.class;
            this.getSelectedClassesId = _data.class.id;
        } else {
            this.dialogTitle = 'New Subject';
            this.classModel = new ClassModel({});
        }
    }

    createClassForm() {
        this.classForm = this._formBuilder.group({
            name: [this.classModel.name, Validators.required],
            subjectCode: [this.classModel.teacher, Validators.required],
            subjects: [this.classModel.subjects, Validators.required]
        });
    }

    saveClass() {
        this.showProgressBar$.next(true);
        // this._classService.addClass(this.subjectForm.value).subscribe(
        //     (res) => {
        //         this._notification.alert(
        //             applicationMessages.SUBJECT.subject_saved,
        //             'success'
        //         );
        //         this.matDialogRef.close();
        //         this.showProgressBar$.next(false);
        //         this._subjectService.onSubjectsChanged.next(true);
        //     },
        //     (err) => {
        //         if (err.message.includes('Http failure response')) {
        //             this._notification.alert(
        //                 applicationMessages.SHARED.internetConnection,
        //                 'error'
        //             );
        //         }
        //         this.showProgressBar$.next(false);
        //     }
        // );
    }

    updateClass(formDetails) {
        // this._subjectService
        //     .updateSubject(this.getSelectedSubjectId, formDetails.value)
        //     .subscribe((res) => {
        //         this._notification.alert(
        //             applicationMessages.SUBJECT.subject_updated,
        //             'success'
        //         );
        //         this.matDialogRef.close();
        //         this._subjectService.onSubjectsChanged.next(true);
        //     });
    }

    ngOnInit() {
        this.createClassForm();
    }
}
