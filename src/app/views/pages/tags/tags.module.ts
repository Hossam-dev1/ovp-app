import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagComponent } from './tag.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';


@NgModule({
	declarations: [
		TagComponent,
		IndexComponent,
		AddComponent,
		EditComponent
	],
	imports: [
		CommonModule,
		TagsRoutingModule,
		SharedModule,
		PagesModule,
	]
})
export class TagsModule { }
