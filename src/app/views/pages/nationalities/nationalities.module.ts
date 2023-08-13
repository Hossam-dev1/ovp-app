import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationalitiesRoutingModule } from './nationalities-routing.module';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { NationalitiesComponent } from './nationalities.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';
import { MatDividerModule } from '@angular/material';


@NgModule({
	declarations: [
		NationalitiesComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
	],
	imports: [
		CommonModule,
		NationalitiesRoutingModule,
		SharedModule,
		PagesModule,
	]
})
export class NationalitiesModule { }
