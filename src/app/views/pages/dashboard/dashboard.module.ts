// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
		NgxChartsModule,
		TranslateModule,
		SharedModule,
	],
	providers: [],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
