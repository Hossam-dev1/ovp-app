import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrewTypeComponent } from './crew-type.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [
	{
		path: '',
		component: CrewTypeComponent,
		children: [
			{
				path: '',
				component: IndexComponent
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
export class CrewTypeRoutingModule { }
