import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentProviderRoutingModule } from './content-provider-routing.module';
import { ContentProviderComponent } from './content-provider.component';
import { AddComponent } from './add/add.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { PartialsModule } from '../../partials/partials.module';
import { PagesModule } from '../pages.module';
import { DetailsComponent } from './details/details.component';


@NgModule({
	declarations: [
		ContentProviderComponent,
		AddComponent,
		IndexComponent,
		EditComponent,
		DetailsComponent
	],
	imports: [
		CommonModule,
		ContentProviderRoutingModule,
		SharedModule,
		PagesModule
	]
})
export class ContentProviderModule { }
