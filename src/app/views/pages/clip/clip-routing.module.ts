import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClipComponent } from './clip.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{
		path: '',
		component: ClipComponent,
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
				path: 'details/:id',
				component: DetailsComponent
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
export class ClipRoutingModule { }
