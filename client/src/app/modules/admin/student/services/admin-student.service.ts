import { StudentModel } from './../models/student.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuardianModel } from '../models/guardian.model';
import { throwError, forkJoin, BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AcademicModel } from '../models/academic.model';

@Injectable({
    providedIn: 'root'
})
export class AdminStudentService {
    guardianEndpoint = environment.apiUrl + 'guardian/';
    imageUploadEndpoint = environment.apiUrl + 'fileupload/';
    studentEndpoint = environment.apiUrl + 'student/';

    onStudentsChanged = new BehaviorSubject<Boolean>(false);

    constructor(private _httpClient: HttpClient) {}

    runOnStudentsChanged = this.onStudentsChanged.asObservable();

    saveGuardianInfo(guardianData: GuardianModel) {
        return this._httpClient.post(this.guardianEndpoint, guardianData).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    updateGuardianDetails(guardianData: GuardianModel, guardianId: string) {
        return this._httpClient.put(`${this.guardianEndpoint + guardianId}`, guardianData).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    getStudentsList() {
        return this._httpClient.get(this.studentEndpoint).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    updateStudentDetails(studentData: StudentModel, studentId: string) {
        return this._httpClient.put(`${this.studentEndpoint + studentId}`, studentData).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    getStudentById(studentId: string) {
        return this._httpClient.get(`${this.studentEndpoint + studentId}`).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    deleteStudent(studentId: string) {
        return this._httpClient.delete(`${this.studentEndpoint + studentId}`).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    saveStudentImage(studentProfile) {
        return this._httpClient.post(this.imageUploadEndpoint, studentProfile).pipe();
    }

    saveGuardianInfoAndImage(guardianInfo: GuardianModel, studentImage: File) {
        // return forkJoin([this.saveGuardianInfo(guardianInfo), this.saveStudentImage(studentImage)]).pipe(
        //     catchError((err) => {
        //         this.handleError([]);
        //         return throwError(err);
        //     })
        // );
    }

    addStudent(studentData: StudentModel) {
        return this._httpClient.post(this.studentEndpoint, studentData).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    getGuardianList() {
        return this._httpClient.get(this.guardianEndpoint).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    // Error
    private handleError(result?: any) {
        let error;
        if (result.error instanceof ErrorEvent) {
            console.error('An error occurred:', result.error.message);
            error = result.error;
        } else {
            console.error(`Backend returned code ${result.status}, ` + `body was: ${result.error}`);
            error = result.error;
        }
        return throwError(error);
    }
}
