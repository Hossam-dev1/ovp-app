import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowsRoutingModule } from './shows-routing.module';
import { ShowsComponent } from './shows.component';
import { PagesModule } from '../pages.module';
import { MatTabsModule } from '@angular/material/tabs';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
	declarations: [
		ShowsComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
		DetailsComponent
	],
	imports: [
		CommonModule,
		ShowsRoutingModule,
		SharedModule,
		PagesModule,
		MatGridListModule,
		MatTabsModule
	]
})
export class ShowsModule { }
