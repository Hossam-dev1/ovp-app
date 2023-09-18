import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipRoutingModule } from './clip-routing.module';
import { ClipComponent } from './clip.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
	declarations: [
		ClipComponent,
		IndexComponent,
		AddComponent,
		EditComponent,
		DetailsComponent
	],
	imports: [
		CommonModule,
		ClipRoutingModule,
		SharedModule,
		PagesModule,
		MatTooltipModule
	]
})
export class ClipModule { }
