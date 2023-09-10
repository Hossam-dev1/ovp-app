import { PagesModule } from './../pages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { EpisodesComponent } from './episodes.component';
import { SharedModule } from '../../shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
	declarations: [
		IndexComponent,
		AddComponent,
		EditComponent,
		EpisodesComponent,
		DetailsComponent
	],
	imports: [
		CommonModule,
		EpisodesRoutingModule,
		SharedModule,
		PagesModule,
		MatGridListModule
	]
})
export class EpisodesModule { }
