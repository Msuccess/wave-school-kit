import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { RegistrationModel } from '../auth.model';
import { JwtAuthService } from 'app/core/jwt-auth.service';
import { NotificationService } from 'app/modules/shared/services/notification.service';

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
    hasFormErrors: boolean;
    invalidCreds$: BehaviorSubject<any>;
    showProgressBar$: BehaviorSubject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _jwtAuth: JwtAuthService,
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

    createRegistrationForm() {
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
                Validators.required
            ]
        });
    }

    register() {
        // this.hasFormErrors = false;
        // this.invalidCreds$.next(false);

        // if (this.registerForm.invalid) {
        //     const controls = this.registerForm.controls;
        //     Object.keys(controls).forEach((key) =>
        //         controls[key].markAsTouched()
        //     );
        //     this.hasFormErrors = true;
        //     return;
        // }

        // this.showProgressBar$.next(true);
        this._jwtAuth.onRegister(this.registerForm.value).subscribe(
            (res: any) => {
                this._notification.alert(
                    'Your Details Saved Successfully',
                    'success'
                );
                console.log('========>Success' + res);
            },
            (err) => {}
        );
    }

    ngOnInit(): void {
        this.createRegistrationForm();
    }
}
