import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject, Observable } from 'rxjs';
import { SubjectModel } from '../models/subject.model';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Resolve
} from '@angular/router';
import { FuseUtils } from '@fuse/utils';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {
    onSubjectsChanged = new BehaviorSubject<Boolean>(false);

    subjectEndPoint = environment.apiUrl + 'subject/';

    constructor(private _httpClient: HttpClient) {}

    runOnSubjectsChanged = this.onSubjectsChanged.asObservable();

    getSubjects() {
        return this._httpClient.get(this.subjectEndPoint).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    addSubject(subjectDetails: SubjectModel) {
        return this._httpClient.post(this.subjectEndPoint, subjectDetails).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    deleteSubject(subjectId: string) {
        return this._httpClient
            .delete(`${this.subjectEndPoint + subjectId}`)
            .pipe(
                catchError((err) => {
                    this.handleError([]);
                    return throwError(err);
                })
            );
    }

    updateSubject(subjectId: string, subjectData: SubjectModel) {
        return this._httpClient
            .put(`${this.subjectEndPoint + subjectId}`, subjectData)
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
