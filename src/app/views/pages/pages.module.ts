// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
import {MaterialPreviewModule} from "../partials/content/general/material-preview/material-preview.module";
// Pages
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {FormsComponent} from './Templates/forms/forms.component';
import {DataTablesComponent} from './Templates/data-tables/data-tables.component';
import {AnalyticsComponent} from './Templates/analytics/analytics.component';
import {GALLERY_CONFIG, GalleryModule} from '@ngx-gallery/core';
import {CustomDatePipe} from '../../core/models/Base/custom.datepipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ɵs } from '@ng-select/ng-select';
import {AddComponent} from './Templates/Template CRUD/add/add.component';
import {EditComponent} from './Templates/Template CRUD/edit/edit.component';
import {IndexComponent} from './Templates/Template CRUD/index/index.component';
import {FormComponent} from './Templates/Template CRUD/form/form.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		NgSelectModule,
		FormsModule,
		PartialsModule,
		MaterialPreviewModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDatepickerModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatTableModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		NgxChartsModule,
		SharedModule,
		RouterModule,
		GalleryModule,
		TranslateModule,
	],
	exports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PartialsModule,
		NgSelectModule,
		MaterialPreviewModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDatepickerModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatTableModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		NgxChartsModule,
		SharedModule,
		CustomDatePipe,
	],
	providers: [
		{
			provide: GALLERY_CONFIG,
			useValue: {
				dots: true,
				imageSize: 'contain'
			}
		},
		NgSelectConfig ,
	],
	declarations: [FormsComponent, DataTablesComponent, AnalyticsComponent, CustomDatePipe,
		AddComponent, EditComponent, IndexComponent, FormComponent
	]
})
export class PagesModule {
}
