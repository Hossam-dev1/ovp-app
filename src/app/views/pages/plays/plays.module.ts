import { PagesModule } from './../pages.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaysRoutingModule } from './plays-routing.module';
import { PlaysComponent } from './plays.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
	declarations: [
		PlaysComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
		DetailsComponent
	],
	imports: [
		CommonModule,
		PlaysRoutingModule,
		SharedModule,
		PagesModule,
	]
})
export class PlaysModule { }
