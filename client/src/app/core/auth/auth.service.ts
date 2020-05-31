import { Injectable, ErrorHandler } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { RegistrationModel } from 'app/modules/authentication/models/auth.model';
import { environment } from 'environments/environment';
import { UsersModel } from './users.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    usersModel = {} as UsersModel;

    usersDetails = new BehaviorSubject<UsersModel>(this.usersModel);
    runUsersDetails = this.usersDetails.asObservable();

    signupEndPoint = environment.apiUrl + 'auth/register';
    loginEndPoint = environment.apiUrl + 'auth/login';
    userProfileEndPoint = environment.apiUrl + 'user';

    constructor(private http: HttpClient, public router: Router) {}

    // Sign-up
    signUp(user_credential: RegistrationModel): Observable<any> {
        return this.http.post(this.signupEndPoint, user_credential).pipe(catchError(this.handleError));
    }

    // Sign-in
    signIn(user_credential: RegistrationModel): Observable<any> {
        return this.http.post<any>(this.loginEndPoint, user_credential).pipe(catchError(this.handleError));
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    setToken(token: any) {
        window.localStorage.setItem('access_token', token);
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
        let api = `${this.userProfileEndPoint}/${id}`;
        return this.http.get(api, { headers: httpOptions.headers }).pipe(
            map((res: Response) => {
                return res || {};
            }),
            catchError(this.handleError)
        );
    }

    // Decode Token
    decodeJwtToken(token: any): any {
        if (!token) {
            return {};
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
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
