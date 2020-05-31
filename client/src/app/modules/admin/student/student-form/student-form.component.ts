import { StudentModel } from './../models/student.model';
import { LocalDataService } from './../../../shared/services/local-data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { TeacherService } from '../../teachers/services/teacher.service';
import { ClassService } from '../../class/services/class.service';
import { AdminStudentService } from '../services/admin-student.service';
import { GuardianModel } from '../models/guardian.model';
import { AcademicModel } from '../models/academic.model';
import { FileValidator } from 'ngx-material-file-input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { applicationMessages } from 'app/core/constants/applicationMessages';
import { Router } from '@angular/router';

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true }
        }
    ]
})
export class StudentFormComponent implements OnInit {
    genderList = [];
    religionList = [];
    teachersList = [];
    classList = [];
    termsList = [];
    formData = [];
    guardianList = [];
    selectedClass: string;
    selectedGenderStudent: string;
    selectedGenderGuardian: string;
    selectedReligion: string;
    selectedGuardian: string;

    readonly maxSize = 104857600; // Maximum size of file should be 100mb

    // Horizontal Stepper
    studentInformationForm: FormGroup;
    guardianInformationForm: FormGroup;
    academicInformationForm: FormGroup;
    generalStudentForm: FormGroup;

    //Models
    guardianModel = {} as GuardianModel;
    studentModel = {} as StudentModel;
    academicModel = {} as AcademicModel;
    profileImage$ = new BehaviorSubject<any>('');
    selectedPicture: File;

    constructor(private _formBuilder: FormBuilder, private _localDataService: LocalDataService, private _teachersLists: TeacherService, private _classService: ClassService, private _studentService: AdminStudentService, private _notification: NotificationService, private _router: Router) {}

    createAddStudentForm(): void {
        this.studentInformationForm = this._formBuilder.group({
            firstname: [this.studentModel.firstname, Validators.required],
            lastname: [this.studentModel.lastname, Validators.required],
            gender: [this.studentModel.gender, Validators.required],
            religion: [this.studentModel.religion, Validators.required],
            birthdate: [this.studentModel.birthdate, Validators.required],
            previous_school: [this.studentModel.previous_school],
            levelId: [this.studentModel.levelId, Validators.required],
            term: [this.studentModel.term, Validators.required],
            special_needs: [this.studentModel.special_needs, Validators.required],
            guardianId: [this.guardianModel.id],
            role: [],
            email: [],
            phoneNumber: [],
            username: [],
            password: []
        });

        this.guardianInformationForm = this._formBuilder.group({
            guardianExists: [],
            firstname: [this.guardianModel.firstname],
            lastname: [this.guardianModel.lastname],
            occupation: [this.guardianModel.occupation],
            telephone: [this.guardianModel.telephone, Validators.pattern('^([()\\- x+]*\\d[()\\- x+]*){4,16}$')],
            relation: [this.guardianModel.relation],
            address: [this.guardianModel.address],
            gender: [this.guardianModel.gender]
        });

        this.academicInformationForm = this._formBuilder.group({
            role: ['student', Validators.required],
            email: [this.academicModel.email, Validators.compose([Validators.required, Validators.email])],
            phoneNumber: [this.academicModel.phoneNumber, Validators.compose([Validators.required, Validators.pattern('^([()\\- x+]*\\d[()\\- x+]*){4,16}$')])],
            username: [this.academicModel.username, Validators.required],
            password: [this.academicModel.password, Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }

    loadAllServices() {
        this._teachersLists.getTeachersList().subscribe(
            (res: any) => {
                this.teachersList = res;
            },
            (err) => {}
        );

        this._studentService.getGuardianList().subscribe(
            (res: any) => {
                this.guardianList = res.data;
            },
            (err) => {
                console.log(err);
            }
        );
        this._localDataService.getGenders().subscribe((res: any) => {
            this.genderList = res;
        });

        this._localDataService.getReligions().subscribe((res: any) => {
            this.religionList = res;
        });

        this._localDataService.getReligions().subscribe((res: any) => {
            this.religionList = res;
        });

        this._localDataService.getTerms().subscribe((res: any) => {
            this.termsList = res;
        });

        this._classService.getClasses().subscribe((res: any) => {
            this.classList = res.data;
        });
    }

    onChange(event: any) {
        // this.selectedPicture = <File>event.target.files[0];
        // if (event.target.files && event.target.files[0]) {
        //     let reader = new FileReader();
        //     const file = event.target.files[0];
        //     reader.readAsDataURL(file);
        //     reader.onload = (e: any) => {
        //         this.profileImage$.next(reader.result.toString());
        //     };
        //     const formData = new FormData();
        //     formData.append('file', file);
        //     this.uploadProfileImage(formData);
        // }
        // if (event.target.files.length > 0) {
        //     const file = event.target.files[0];
        //     this.academicInformationForm.get('avatar').setValue(file);
        // }
        // const formData = new FormData();
        // formData.append('file', this.academicInformationForm.get('avatar').value);
        // this.uploadProfileImage();
    }

    uploadProfileImage() {
        // const fb = new FormData();
        // fb.append('image', this.selectedPicture, this.selectedPicture.name);
        // this._studentService.saveStudentImage(fb).subscribe(
        //     (res) => {
        //         console.log('success');
        //         console.log(res);
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // );
    }

    finishHorizontalStepper(): void {
        // this.generalStudentForm = new FormGroup({this.studentInformationForm,this.academicInformationForm });

        if (this.guardianInformationForm.value.guardianExists === null) {
            // ! save guardian
            this._studentService.saveGuardianInfo(this.guardianInformationForm.value).subscribe(
                (res: any) => {
                    console.log(res);
                    const guardian_id = res.data.id;
                    this.studentInformationForm.patchValue({ guardianId: guardian_id });

                    this._studentService.addStudent(this.studentInformationForm.value).subscribe(
                        (res) => {
                            console.log('Success', res);
                        },
                        (err) => {
                            console.log('Error', err);
                        }
                    );
                },
                (err) => {
                    console.log('error', err);
                }
            );
        } else {
            // ! Do not save Guardian
            const guardian_id = this.guardianInformationForm.value.guardianExists;
            const role = this.academicInformationForm.value.role;
            const email = this.academicInformationForm.value.email;
            const username = this.academicInformationForm.value.username;
            const password = this.academicInformationForm.value.password;
            const phoneNumber = this.academicInformationForm.value.phoneNumber;

            this.studentInformationForm.patchValue({ guardianId: guardian_id, role: role, email: email, phoneNumber: phoneNumber, username: username, password: password });

            this._studentService.addStudent(this.studentInformationForm.value).subscribe(
                (res) => {
                    this._notification.alert(applicationMessages.STUDENT.student_saved, 'success');
                    this._router.navigate(['/admin/student']);
                },
                (err) => {
                    console.log('Error', err);
                }
            );
        }
    }

    onExistingParentSelect() {
        this.guardianInformationForm.get('guardianExists').valueChanges.subscribe((selectedGuardian) => {
            if (selectedGuardian !== null) {
                if (selectedGuardian.trim().length !== 0) {
                    this.guardianInformationForm.get('firstname').reset();
                    this.guardianInformationForm.get('firstname').disable();
                    this.guardianInformationForm.get('lastname').reset();
                    this.guardianInformationForm.get('lastname').disable();
                    this.guardianInformationForm.get('occupation').reset();
                    this.guardianInformationForm.get('occupation').disable();
                    this.guardianInformationForm.get('telephone').reset();
                    this.guardianInformationForm.get('telephone').disable();
                    this.guardianInformationForm.get('relation').reset();
                    this.guardianInformationForm.get('relation').disable();
                    this.guardianInformationForm.get('gender').reset();
                    this.guardianInformationForm.get('gender').disable();
                    this.guardianInformationForm.get('address').reset();
                    this.guardianInformationForm.get('address').disable();
                } else {
                    this.guardianInformationForm.get('firstname').enable();
                    this.guardianInformationForm.get('lastname').enable();
                    this.guardianInformationForm.get('occupation').enable();
                    this.guardianInformationForm.get('telephone').enable();
                    this.guardianInformationForm.get('relation').enable();
                    this.guardianInformationForm.get('gender').enable();
                    this.guardianInformationForm.get('address').enable();
                }
            }
        });

        this.guardianInformationForm.get('firstname').valueChanges.subscribe((enteredFirstname) => {
            if (enteredFirstname.trim().length !== 0) {
                this.guardianInformationForm.get('guardianExists').reset();
                this.guardianInformationForm.get('guardianExists').disable();
            } else {
                this.guardianInformationForm.get('guardianExists').enable();
            }
        });
    }

    ngOnInit(): void {
        this.loadAllServices();
        this.createAddStudentForm();
        this.onExistingParentSelect();
    }
}
