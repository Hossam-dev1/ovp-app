import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';


@NgModule({
	declarations: [
		UserComponent,
		IndexComponent,
		AddComponent,
		EditComponent
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		SharedModule,
		PagesModule,
	]
})
export class UsersModule { }
