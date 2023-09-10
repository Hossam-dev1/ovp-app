import { EpisodesComponent } from './episodes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';


const routes: Routes = [
	{
		path: '',
		component: EpisodesComponent,
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'details/:id',
				component: DetailsComponent
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
export class EpisodesRoutingModule { }
