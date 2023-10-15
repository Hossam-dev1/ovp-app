import { PermissionsGuard } from './../../../core/guards/permissions.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
const routes: Routes = [
	{
		path: '',
		component: MoviesComponent,
		canActivateChild: [PermissionsGuard],

		children: [
			{
				path: '',
				component: IndexComponent,
				data: {
					permissions: ['ADMINS_CLIPS_INDEX'],
				},
			},
			{
				path: 'add',
				component: AddComponent,
				data: {
					permissions: ['ADMINS_CLIPS_STORE'],
				},
			},
			{
				path: 'details/:id',
				component: DetailsComponent,
				data: {
					permissions: ['ADMINS_CLIPS_SHOW'],
				},
			},
			{
				path: 'edit/:id',
				component: EditComponent,
				data: {
					permissions: ['ADMINS_CLIPS_UPDATE'],
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
export class MoviesRoutingModule { }
