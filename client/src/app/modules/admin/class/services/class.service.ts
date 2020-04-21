import { ClassModel } from './../models/class.model';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    onClassesChanged = new BehaviorSubject<Boolean>(false);
    runOnClassesChanged = this.onClassesChanged.asObservable();

    classEndpoint = environment.apiUrl + 'level/';

    constructor(private _httpClient: HttpClient) {}

    getClasses() {
        return this._httpClient.get(this.classEndpoint).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    addClass(classDetails: ClassModel) {
        return this._httpClient.post(this.classEndpoint, classDetails).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    deleteClass(classId: string) {
        return this._httpClient.delete(`${this.classEndpoint + classId}`).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    updateClass(classId: string, classData: ClassModel) {
        return this._httpClient
            .put(`${this.classEndpoint + classId}`, classData)
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
