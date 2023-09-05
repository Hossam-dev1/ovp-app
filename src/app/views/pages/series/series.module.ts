import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [
    SeriesComponent,
    IndexComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule
  ]
})
export class SeriesModule { }
