import { PermissionsGuard } from './../../../core/guards/permissions.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
	{
		path: '',
		component: UserComponent,
		canActivateChild: [PermissionsGuard],

		children: [
			{
				path: '',
				component: IndexComponent,
				data: {
					permissions: ['ADMINS_ADMINS_INDEX'],
				},
			},
			{
				path: 'add',
				component: AddComponent,
				data: {
					permissions: ['ADMINS_ADMINS_STORE'],
				},
			},
			{
				path: 'edit/:id',
				component: EditComponent,
				data: {
					permissions: ['ADMINS_ADMINS_UPDATE'],
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
export class UsersRoutingModule { }
