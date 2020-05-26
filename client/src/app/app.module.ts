import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AdminModule } from './modules/admin/admin.module';
import { SharedModule } from './modules/shared/shared.module';
import { authInterceptorProviders } from './core/auth/auth.interceptor';
import { AuthGuard } from './core/auth/auth.guard';
import { fuseConfig } from './core/fuse-config';
import { SampleModule } from './core/main/sample/sample.module';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        AuthenticationModule,
        AdminModule,
        SharedModule
    ],
    bootstrap: [AppComponent],
    providers: [authInterceptorProviders]
})
export class AppModule {}
