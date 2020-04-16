import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';
import { AuthenticationModule } from 'app/modules/authentication/authentication.module';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistrationModel } from 'app/modules/authentication/auth.model';

@Injectable({
    providedIn: 'root'
})
export class JwtAuthService {
    loginUrl = environment.apiUrl + 'auth/login';
    registerUrl = environment.apiUrl + 'auth/register';

    constructor(private httpClient: HttpClient) {}

    // Error Handler

    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return from(result);
        };
    }

    public onLogin(username: string, password: string) {
        return this.httpClient
            .post<{ token: string }>(this.loginUrl, { username, password })
            .pipe(
                tap((res) => {
                    localStorage.setItem('token', res.token);
                })
            );
    }

    onLogout() {
        localStorage.removeItem('token');
    }

    public get loggedIn(): boolean {
        return localStorage.getItem('token') !== null;
    }

    public onRegister(credential: RegistrationModel): Observable<any> {
        return this.httpClient.post(this.registerUrl, credential).pipe(
            catchError((err) => {
                this.handleError('register', []);
                return throwError(err);
            })
        );
    }
}
