import { PagesModule } from './../pages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreComponent } from './genre.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: GenreComponent,
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
			{path: '**', redirectTo: '', pathMatch: 'full'},
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
	],
	providers: [],
	declarations: [
		GenreComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
	]
})
export class GenreModule { }
