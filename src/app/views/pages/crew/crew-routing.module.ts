import { DetailsComponent } from './components/details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrewComponent } from './crew.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [
	{
		path: '',
		component: CrewComponent,
		children: [
			{
				path: '',
				component: IndexComponent
			} ,
			{
				path: 'details/:id',
				component: DetailsComponent
			} ,
			{
				path: 'add',
				component: AddComponent
			} ,
			{
				path: 'edit/:id',
				component: EditComponent
			} ,
			{path: '**', redirectTo: '', pathMatch: ''},
		]
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewRoutingModule { }
