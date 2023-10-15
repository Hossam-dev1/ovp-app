import { PermissionsGuard } from './../../../core/guards/permissions.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NationalitiesComponent } from './nationalities.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [
	{
		path: '',
		component: NationalitiesComponent,
		canActivateChild: [PermissionsGuard],

		children: [
			{
				path: '',
				component: IndexComponent,
				data: {
					permissions: ['ADMINS_NATIONALITIES_INDEX'],
				},
			},
			{
				path: 'add',
				component: AddComponent,
				data: {
					permissions: ['ADMINS_NATIONALITIES_STORE'],
				},
			},
			{
				path: 'edit/:id',
				component: EditComponent,
				data: {
					permissions: ['ADMINS_NATIONALITIES_UPDATE'],
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
export class NationalitiesRoutingModule { }
