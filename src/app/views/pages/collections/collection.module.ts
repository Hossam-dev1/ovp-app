import { MaterialPreviewModule } from './../../partials/content/general/material-preview/material-preview.module';
import { PagesModule } from './../pages.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
	declarations: [
		CollectionComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
		],
	imports: [
		CommonModule,
		CollectionRoutingModule,
		SharedModule,
		PagesModule,
		MaterialPreviewModule,
	]
})
export class CollectionModule { }
