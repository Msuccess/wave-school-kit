import { LocalDataService } from './../../../shared/services/local-data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { TeacherService } from '../../teachers/services/teacher.service';
import { ClassService } from '../../class/services/class.service';
import { AdminStudentService } from '../services/admin-student.service';

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

    // Horizontal Stepper
    studentInformationForm: FormGroup;
    guardianInformationForm: FormGroup;
    academicInformationForm: FormGroup;

    constructor(private _formBuilder: FormBuilder, private _localDataService: LocalDataService, private _teachersLists: TeacherService, private _classService: ClassService, private _studentService: AdminStudentService) {}

    createAddStudentForm() {
        // Horizontal Stepper form steps
        this.studentInformationForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            religion: ['', Validators.required],
            birthdate: ['', Validators.required],
            picture: [''],
            special_needs: ['', Validators.required]
        });

        this.guardianInformationForm = this._formBuilder.group({
            existingParent: [''],
            name: [''],
            occupation: [''],
            telephone: [],
            relation: [''],
            email: [],
            address: []
        });

        this.academicInformationForm = this._formBuilder.group({
            class: ['', Validators.required],
            term: ['', Validators.required],
            previous_school: ['', Validators.required],
            reason_for_leaving: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
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

    finishHorizontalStepper(): void {
        this._studentService.saveGuardianInfo(this.guardianInformationForm.value).subscribe(
            (res) => {
                console.log(res);
                debugger;
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
