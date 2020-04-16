import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';

const routes: Routes = [
    {
        path: '',
        component: AuthLoginComponent
    },
    {
        path: 'login',
        component: AuthLoginComponent
    },
    {
        path: 'login/reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'register',
        component: AuthRegisterComponent
    }
];

@NgModule({
    declarations: [
        AuthLoginComponent,
        ResetPasswordComponent,
        AuthRegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule
    ],
    exports: [RouterModule]
})
export class AuthenticationModule {}
