import { CompanyComponent } from './company.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';

@NgModule({
	declarations: [CompanyComponent, AddComponent, EditComponent, IndexComponent],
	imports: [
		CommonModule,
		CompanyRoutingModule,
		SharedModule,
		PagesModule
	]
})
export class CompanyModule { }
