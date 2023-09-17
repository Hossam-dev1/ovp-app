import { PagesModule } from './../pages.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { PartialsModule } from '../../partials/partials.module';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
	declarations: [
		MoviesComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
		DetailsComponent
	],
	imports: [
		CommonModule,
		MoviesRoutingModule,
		SharedModule,
		PagesModule,
	]
})
export class MoviesModule { }
