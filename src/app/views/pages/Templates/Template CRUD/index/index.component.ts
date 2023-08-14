import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {IndexInterface} from '../../../../shared/Base-Interface/Index.Interface';
import {PaginateParams} from '../../../../../core/models/paginateParams.interface';
import {AuthNoticeService} from '../../../../../core/services/auth-notice.service';
import {HelperService} from '../../../../../core/services/helper.service';
import {InitializeComponentInterface} from '../../../../shared/Base-Interface/Initialize.Component.Interface';
import {Router} from '@angular/router';
import {GlobalConfig} from '../../../../../core/Global/global.config';
import {SectionIconsName} from '../../../../../core/Global/section.icons.name';
import {TranslateService} from '@ngx-translate/core';
import {RoutesName} from '../../../../../core/Global/routes.name';

declare var $ :any;

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit , OnDestroy, IndexInterface , InitializeComponentInterface{

	page_name:string;
	content_name:string;
	add_route:string;
	service
	navigationSubscription;

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	//Data table variables
	dataSource;
	displayedColumns: string[] = ['id' , 'content' , 'is_active' , 'options'];
	isLoadingResults:boolean = true;
	// pagination variables
	resultsLength = 0;
	pageIndex = 0;
	//filter variables
	headerParams : PaginateParams = {
		active : 1,
		per_page: GlobalConfig.pagination_per_page ,
		search_key: null ,
		sort_key: null ,
		sort_order: null ,
		next_page_index: 0,
	};

	constructor(private cdr: ChangeDetectorRef ,
				// public service: DoctorsService,
				private authNoticeService: AuthNoticeService,
				public translateService : TranslateService,
				private router: Router,
				private helper: HelperService) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}

	// onInit get Data from api
	ngOnInit() {
		this.initialiseComponent();
		this.page_name = this.translateService.instant('Components.PUBLICATION_RULE.name');
		this.content_name = this.translateService.instant('Components.PUBLICATION_RULE.single');
		this.add_route = RoutesName.add();
	}

	initialiseComponent() {
		this.get(this.headerParams);
	}

	// call api to get Banner Data from the server
	get(headerParams) {
		this.headerParams = headerParams;
		this.isLoadingResults = true;
		// let data = this.service.list(headerParams).subscribe(
		// 	(resp) => {
		// 		this.dataSource =  new MatTableDataSource(resp);
		// 		this.dataSource.sort = this.sort;
		// 		this.isLoadingResults = false;
		// 		this.resultsLength = (resp['pagination'] ? resp['pagination'].total : 0);
		// 		this.cdr.markForCheck();
		// 	} , error => {
		// 		this.dataSource =  new MatTableDataSource([]);
		// 		this.dataSource.sort = this.sort;
		// 		this.isLoadingResults = false;
		// 		this.cdr.markForCheck();
		// 	});
	}

	// pagination data tables
	public pagination (event?:PageEvent) {
		this.pageIndex = event.pageIndex;
		this.headerParams.next_page_index = this.pageIndex;
		this.get(this.headerParams);
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.isLoadingResults = false;

		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}

	pageIcon(){
	//	return SectionIconsName.doctors();
	}

	displayContent(text){
		return (text.length > 70) ? text.substring(0, 70) + ' ......' : text;
	}

}
