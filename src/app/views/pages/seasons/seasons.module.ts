import { MatGridListModule } from '@angular/material/grid-list';
import { PagesModule } from './../pages.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonsRoutingModule } from './seasons-routing.module';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { SeasonsComponent } from './seasons.component';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
	declarations: [
		SeasonsComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
		DetailsComponent
	],
	imports: [
		CommonModule,
		SeasonsRoutingModule,
		SharedModule,
		PagesModule,
		MatGridListModule
	]
})
export class SeasonsModule { }
