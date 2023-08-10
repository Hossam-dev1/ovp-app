// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// Material
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
// Translate
import { TranslateModule } from '@ngx-translate/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
// Auth
import {  AuthService } from '../../../core/services/auth.service';
import {  AuthGuard } from '../../../core/guards/auth.guard';
import {PagesModule} from '../pages.module';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent,
				data: {returnUrl: window.location.pathname}
			},

		]
	}
];


@NgModule({
	imports: [
		CommonModule,
		PagesModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule.forChild(),
		SharedModule
	],
    exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard
			]
		};
	}
}
