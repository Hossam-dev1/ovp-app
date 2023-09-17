import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { ShowsComponent } from './shows.component';


const routes: Routes = [
	{
		path: '',
		component: ShowsComponent,
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
export class ShowsRoutingModule { }
