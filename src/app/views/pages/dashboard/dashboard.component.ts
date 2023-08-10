import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {InitializeComponentInterface} from '../../shared/Base-Interface/Initialize.Component.Interface';
import {Router} from '@angular/router';
import {HelperService} from '../../../core/services/helper.service';
import { RoutesName } from '../../../core/Global/routes.name';


@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy, InitializeComponentInterface {
	navigationSubscription;
	isResults: boolean = false;

	isLoadingResults: boolean = true;


	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = 'Number';
	showYAxisLabel = true;
	autoScale: true;
	yAxisLabel = 'Color Value';
	timeline = true;
	// colors
	colorScheme = {
		domain: [
			'#e74c3c',
			'#27ae60',
			'#f1c40f',
			'#8e44ad'
		]
	};

	orders_counts: any[] = [];
	orders_prices: any[] = [];



	base_url:string;

	constructor(private translate: TranslateService,
				private router: Router,
				private helper: HelperService,
				// private services: DashboardService,
				private cdr: ChangeDetectorRef) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}




	// onInit get Data from api
	ngOnInit() {
		this.base_url = '/' + RoutesName.cms() + '/';
		this.initialiseComponent();
	}

	initialiseComponent() {
		// this.get();
	}

	// // call api to get Banner Data from the server
	// get() {
	// 	this.isLoadingResults = true;
	// 	this.services.get().subscribe(
	// 		(resp) => {
	// 			this.isResults = true;
	// 			this.isLoadingResults = false;
	// 			this.Dashbard = resp;
	// 			this.cdr.markForCheck();
	// 		}, error => {
	// 			this.isLoadingResults = false;
	// 			this.cdr.markForCheck();
	// 		});
	// }


	onSelect(event) {

	}

	ngOnDestroy(): void {

		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}



}
