import { PermissionsGuard } from './../../../core/guards/permissions.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [
	{
		path: '',
		component: CompanyComponent,
		canActivateChild: [PermissionsGuard],

		children: [
			{
				path: '',
				component: IndexComponent,
				data: {
					permissions: ['ADMINS_COMPANIES_INDEX'],
				},
			},
			{
				path: 'add',
				component: AddComponent,
				data: {
					permissions: ['ADMINS_COMPANIES_STORE'],
				},
			},
			{
				path: 'edit/:id',
				component: EditComponent,
				data: {
					permissions: ['ADMINS_COMPANIES_UPDATE'],
				},
			},
			{ path: '**', redirectTo: '', pathMatch: 'full' },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CompanyRoutingModule { }
