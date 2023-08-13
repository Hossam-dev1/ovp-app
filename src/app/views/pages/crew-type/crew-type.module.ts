import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrewTypeRoutingModule } from './crew-type-routing.module';
import { AddComponent } from './components/add/add.component';
import { IndexComponent } from './components/index/index.component';
import { EditComponent } from './components/edit/edit.component';
import { CrewTypeComponent } from './crew-type.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';


@NgModule({
  declarations: [AddComponent, IndexComponent, EditComponent, CrewTypeComponent],
  imports: [
    CommonModule,
    CrewTypeRoutingModule,
	SharedModule,
	PagesModule,
  ]
})
export class CrewTypeModule { }
