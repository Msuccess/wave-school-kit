import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject, Observable } from 'rxjs';
import { TeacherModel } from '../models/teacher.model';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Resolve
} from '@angular/router';
import { FuseUtils } from '@fuse/utils';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {
    onTeachersChanged = new BehaviorSubject<Boolean>(false);

    teacherEndPoint = environment.apiUrl + 'teacher/';

    constructor(private _httpClient: HttpClient) {}

    runOnTeachersChanged = this.onTeachersChanged.asObservable();

    getTeachersList() {
        return this._httpClient.get('./assets/localData/teachers_list.json');
    }

    getTeachers() {
        return this._httpClient.get(this.teacherEndPoint).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    addTeacher(teacherDetails: TeacherModel) {
        return this._httpClient.post(this.teacherEndPoint, teacherDetails).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    deleteTeacher(teacherId: string) {
        return this._httpClient
            .delete(`${this.teacherEndPoint + teacherId}`)
            .pipe(
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    updateTeacher(teacherId: string, teacherData: TeacherModel) {
        console.log(teacherData);
        return this._httpClient
            .put(`${this.teacherEndPoint + teacherId}`, teacherData)
            .pipe(
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
            console.error(
                `Backend returned code ${result.status}, ` +
                    `body was: ${result.error}`
            );
            error = result.error;
        }
        return throwError(error);
    }
}
