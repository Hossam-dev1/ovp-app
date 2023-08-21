import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentProviderComponent } from './content-provider.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
	{
		path: '',
		component: ContentProviderComponent,
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
export class ContentProviderRoutingModule { }
