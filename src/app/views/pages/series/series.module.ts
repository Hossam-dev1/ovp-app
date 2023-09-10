import { PagesModule } from './../pages.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
	declarations: [
		SeriesComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
		DetailsComponent
	],
	imports: [
		CommonModule,
		SeriesRoutingModule,
		SharedModule,
		PagesModule,
		MatGridListModule,
		MatTabsModule
	]
})
export class SeriesModule { }
