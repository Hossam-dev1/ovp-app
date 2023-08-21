import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagComponent } from './tag.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{
		path: '',
		component: TagComponent,
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
export class TagsRoutingModule { }
