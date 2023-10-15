import { PermissionSettingConfig } from './../../../core/Global/permissions/permission.setting.config';
import { PermissionsGuard } from './../../../core/guards/permissions.guard';
import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClipComponent } from './clip.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
let permissionSettingConfig = new PermissionSettingConfig();

const routes: Routes = [
	{
		path: '',
		component: ClipComponent,
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
export class ClipRoutingModule { }
