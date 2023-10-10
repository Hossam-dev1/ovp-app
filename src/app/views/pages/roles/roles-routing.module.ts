import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
	{
		path: '',
		component: RoleComponent,
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'add',
				component: AddComponent
			},
			{
				path: 'edit/:id',
				component: EditComponent
			},
			{ path: '**', redirectTo: '', pathMatch: 'full' },
		]
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RolesRoutingModule { }
