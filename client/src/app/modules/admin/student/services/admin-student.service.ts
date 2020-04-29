import { StudentModel } from './../models/student.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuardianModel } from '../models/guardian.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AcademicModel } from '../models/academic.model';

@Injectable({
    providedIn: 'root'
})
export class AdminStudentService {
    guardianEndpoint = environment.apiUrl + 'guardian/';

    constructor(private _httpClient: HttpClient) {}

    saveGuardianInfo(guardianData: GuardianModel) {
        return this._httpClient.post(this.guardianEndpoint, guardianData).pipe(
            catchError((err) => {
                this.handleError([]);
                return throwError(err);
            })
        );
    }

    addStudent(
        studentInfo: StudentModel,
        guardianInfo: GuardianModel,
        academicInfo: AcademicModel
    ) {}

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
