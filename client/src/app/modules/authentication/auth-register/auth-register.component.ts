import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { RegistrationModel } from '../models/auth.model';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { AuthService } from 'app/core/auth/auth.service';
import { applicationMessages } from 'app/core/constants/applicationMessages';

@Component({
    selector: 'app-auth-register',
    templateUrl: './auth-register.component.html',
    styleUrls: ['./auth-register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthRegisterComponent implements OnInit {
    registerForm: FormGroup;
    registrationModel = {} as RegistrationModel;
    hasFormErrors: Boolean = false;
    showProgressBar$ = new BehaviorSubject<boolean>(false);
    errorMessage: string;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _notification: NotificationService
    ) {
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

    createRegistrationForm(): void {
        this.registerForm = this._formBuilder.group({
            username: [this.registrationModel.username, Validators.required],
            email: [
                this.registrationModel.email,
                Validators.compose([Validators.required, Validators.email])
            ],
            password: [
                this.registrationModel.password,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8)
                ])
            ],
            phoneNumber: [
                this.registrationModel.phoneNumber,
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^([()\\- x+]*\\d[()\\- x+]*){4,16}$')
                ])
            ]
        });
    }

    register(): void {
        this.showProgressBar$.next(true);
        this._authService.signUp(this.registerForm.value).subscribe(
            (res: any) => {
                this.showProgressBar$.next(false);
                this._notification.alert(
                    'Your Details Saved Successfully',
                    'success'
                );
            },
            (err) => {
                this.showProgressBar$.next(false);
                if (err.type === 'error') {
                    this.errorMessage =
                        applicationMessages.SHARED.internetConnection;
                } else if (err.detail.includes('already exists')) {
                    this.errorMessage = applicationMessages.AUTH.usernameExists;
                }
                this.hasFormErrors = true;
            }
        );
    }

    closeAlert() {
        this.hasFormErrors = false;
    }

    ngOnInit(): void {
        this.createRegistrationForm();
    }
}
