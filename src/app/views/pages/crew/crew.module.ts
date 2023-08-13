import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrewRoutingModule } from './crew-routing.module';
import { CrewComponent } from './crew.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';
import { DetailsComponent } from './components/details/details.component';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';


@NgModule({
	declarations: [CrewComponent, IndexComponent, AddComponent, EditComponent, DetailsComponent],
	imports: [
		CommonModule,
		CrewRoutingModule,
		SharedModule,
		PagesModule,
		MaterialPreviewModule,
	]
})
export class CrewModule { }
