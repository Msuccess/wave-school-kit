import { Injectable } from '@angular/core';
import {
    HttpHeaders,
    HttpClient,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { RegistrationModel } from 'app/modules/authentication/models/auth.model';
import { environment } from 'environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser = {};

    signupUrl = environment.apiUrl + 'auth/register';
    loginUrl = environment.apiUrl + 'auth/login';
    userProfileUrl = environment.apiUrl + 'user';

    constructor(private http: HttpClient, public router: Router) {}

    // Sign-up
    signUp(user_credential: RegistrationModel): Observable<any> {
        return this.http
            .post(this.signupUrl, user_credential)
            .pipe(catchError(this.handleError));
    }

    // Sign-in
    signIn(user_credential: RegistrationModel) {
        return this.http
            .post<any>(this.loginUrl, user_credential)
            .subscribe((res: any) => {
                localStorage.setItem('access_token', res.token);
                this.getUserProfile(res._id).subscribe((res) => {
                    this.currentUser = res;
                    this.router.navigate(['admin/dashboard' + res.msg._id]);
                });
            });
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return authToken !== null ? true : false;
    }

    doLogout() {
        let removeToken = localStorage.removeItem('access_token');
        if (removeToken == null) {
            this.router.navigate(['/login']);
        }
    }

    // User profile
    getUserProfile(id): Observable<any> {
        let api = `${this.userProfileUrl}/${id}`;
        return this.http.get(api, { headers: httpOptions.headers }).pipe(
            map((res: Response) => {
                return res || {};
            }),
            catchError(this.handleError)
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
