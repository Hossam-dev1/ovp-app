import { SharedModule } from './../../shared/shared.module';
import { CompanyTypeComponent } from './company-type.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyTypeRoutingModule } from './company-type-routing.module';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { PagesModule } from '../pages.module';

CompanyTypeComponent
@NgModule({
	declarations: [CompanyTypeComponent, IndexComponent, AddComponent, EditComponent],
	imports: [
		CommonModule,
		CompanyTypeRoutingModule,
		SharedModule,
		PagesModule
	]
})
export class CompanyTypeModule { }
