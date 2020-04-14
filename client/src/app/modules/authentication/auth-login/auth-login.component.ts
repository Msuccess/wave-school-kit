import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginModel } from '../models/login.model';

@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthLoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormModel = {} as LoginModel;

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseConfigService: FuseConfigService
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

    createLoginForm() {
        this.loginForm = this._formBuilder.group({
            email: [
                this.loginFormModel.username,
                [Validators.required, Validators.email]
            ],
            password: [this.loginFormModel.password, Validators.required]
        });
    }

    loginSubmit($event: any) {
        console.log('All the form data are here ========>' + $event);
        debugger;
    }

    ngOnInit() {
        this.createLoginForm();
    }
}
