import { PagesModule } from './../pages.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';


@NgModule({
	declarations: [
		CategoryComponent,
		AddComponent,
		EditComponent,
		IndexComponent
	],
	imports: [
		CommonModule,
		CategoriesRoutingModule,
		SharedModule,
		PagesModule
	]
})
export class CategoriesModule { }
