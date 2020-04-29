import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginModel } from '../models/login.model';
import { AuthService } from 'app/core/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { Router } from '@angular/router';
import { applicationMessages } from 'app/core/constants/applicationMessages';

@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthLoginComponent implements OnInit {
    showProgressBar$ = new BehaviorSubject<boolean>(false);
    loginForm: FormGroup;
    loginFormModel = {} as LoginModel;
    hasFormErrors: Boolean = false;
    errorMessage: string;

    constructor(private _formBuilder: FormBuilder, private _fuseConfigService: FuseConfigService, private _authService: AuthService, private _notification: NotificationService, private route: Router) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    createLoginForm() {
        this.loginForm = this._formBuilder.group({
            username: [this.loginFormModel.username, [Validators.required]],
            password: [this.loginFormModel.password, Validators.required]
        });
    }

    loginSubmit() {
        this.showProgressBar$.next(true);
        this._authService.signIn(this.loginForm.value).subscribe(
            (res) => {
                debugger;
                this._authService.setToken(res.data.token.token);
                this._authService.usersDetails.next({ username: res.data.dbUser.username, userEmail: res.data.dbUser.email, userPicture: '' });
                this.showProgressBar$.next(false);
                this._notification.alert('Login Successful', 'success');
                this.route.navigate(['/admin/dashboard']);
            },
            (err) => {
                this.showProgressBar$.next(false);

                if (err.type === 'error') {
                    this.errorMessage = applicationMessages.SHARED.internetConnection;
                } else if (err.message.includes('password incorrect')) {
                    this.errorMessage = applicationMessages.AUTH.loginError;
                }
                this.hasFormErrors = true;
            }
        );
    }

    ngOnInit() {
        this.createLoginForm();
    }
}
