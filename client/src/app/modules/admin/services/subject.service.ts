import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SubjectModel } from '../models/subject.model';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {
    constructor(private _httpClient: HttpClient) {}

    subjectEndPoint = environment.apiUrl + 'subject';

    addSubject(subjectData: SubjectModel) {
        return this._httpClient.post(this.subjectEndPoint, subjectData).pipe(
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
