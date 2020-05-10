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

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentFormComponent implements OnInit {
    genderList = [];
    religionList = [];
    teachersList = [];
    classList = [];
    termsList = [];
    formData = [];

    readonly maxSize = 104857600; // Maximum size of file should be 100mb

    // Horizontal Stepper
    studentInformationForm: FormGroup;
    guardianInformationForm: FormGroup;
    academicInformationForm: FormGroup;

    //Models
    guardianModel = {} as GuardianModel;
    studentModel = {} as StudentModel;
    academicModel = {} as AcademicModel;
    profileImage$ = new BehaviorSubject<any>('');
    selectedPicture: File;

    constructor(private _formBuilder: FormBuilder, private _localDataService: LocalDataService, private _teachersLists: TeacherService, private _classService: ClassService, private _studentService: AdminStudentService) {}

    createAddStudentForm(): void {
        this.studentInformationForm = this._formBuilder.group({
            firstName: [this.studentModel.firstname, Validators.required],
            lastName: [this.studentModel.lastname, Validators.required],
            gender: [this.studentModel.gender, Validators.required],
            religion: [this.studentModel.religion, Validators.required],
            birthdate: [this.studentModel.birthdate, Validators.required],
            previous_school: [this.studentModel.previousSchool],
            level: [this.studentModel.level, Validators.required],
            term: [this.studentModel.term, Validators.required],
            special_needs: [this.studentModel.specialNeeds]
        });

        this.guardianInformationForm = this._formBuilder.group({
            existingParent: [this.guardianModel.id],
            firstname: [this.guardianModel.firstname],
            lastname: [this.guardianModel.lastname],
            occupation: [this.guardianModel.occupation],
            telephone: [this.guardianModel.telephone],
            relation: [this.guardianModel.relation],
            address: [this.guardianModel.address],
            gender: [this.guardianModel.gender]
        });

        this.academicInformationForm = this._formBuilder.group({
            role: ['student', Validators.required],
            avatar: [this.academicModel.avatar, [Validators.required, FileValidator.maxContentSize(this.maxSize)]],
            email: [this.academicModel.email, Validators.required],
            phoneNumber: [this.academicModel.phoneNumber, Validators.required],
            username: [this.academicModel.username, Validators.required],
            password: [this.academicModel.password, Validators.required]
        });
    }

    loadAllServices() {
        this._teachersLists.getTeachersList().subscribe(
            (res: any) => {
                this.teachersList = res;
            },
            (err) => {}
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

    ngOnInit(): void {
        this.loadAllServices();
        this.createAddStudentForm();
    }

    onChange(event: any) {
        this.selectedPicture = <File>event.target.files[0];
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

        this.uploadProfileImage();
    }

    uploadProfileImage() {
        const fb = new FormData();
        fb.append('image', this.selectedPicture, this.selectedPicture.name);

        this._studentService.saveStudentImage(fb).subscribe(
            (res) => {
                console.log(res);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    finishHorizontalStepper(): void {
        if (this.guardianInformationForm.value.existingParent === null) {
            // ! save guardian
            // this._studentService.saveGuardianInfoAndImage(this.guardianInformationForm.value, this.academicInformationForm.value.avatar.files[0]).subscribe(
            //     (res) => {
            //         console.log(res);
            //     },
            //     (err) => {
            //         console.log(err);
            //     }
            // );
        } else {
            // ! Do not save Guardian
        }
    }
}
