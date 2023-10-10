import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleComponent } from './role.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';


@NgModule({
	declarations: [
		RoleComponent,
		AddComponent,
		EditComponent,
		IndexComponent
	],
	imports: [
		CommonModule,
		RolesRoutingModule,
		SharedModule,
		PagesModule,
	]
})
export class RolesModule { }
