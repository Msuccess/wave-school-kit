import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { RegistrationModel } from '../models/auth.model';
import { NotificationService } from 'app/modules/shared/services/notification.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-auth-register',
    templateUrl: './auth-register.component.html',
    styleUrls: ['./auth-register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthRegisterComponent implements OnInit {
    showLoadingSpinner$ = new BehaviorSubject<boolean>(false);
    registerForm: FormGroup;
    registrationModel = {} as RegistrationModel;
    hasFormErrors: Boolean = false;
    invalidCreds$: BehaviorSubject<any>;
    showProgressBar$: BehaviorSubject<any>;
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
        this.showLoadingSpinner$.next(true);
        this._authService.signUp(this.registerForm.value).subscribe(
            (res: any) => {
                this.showLoadingSpinner$.next(false);
                this._notification.alert(
                    'Your Details Saved Successfully',
                    'success'
                );
            },
            (err) => {
                this.showLoadingSpinner$.next(false);
                const errorMessage = err.error.message.detail;
                if (errorMessage.includes('already exists')) {
                    this.hasFormErrors = true;
                    this.errorMessage = 'Username has already been taken';
                }
                console.log(err.error.message.detail);
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
