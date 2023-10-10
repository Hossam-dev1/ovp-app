import { filter } from 'rxjs/operators';
import { LangService } from './../../../core/services/lang.service';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { PaginateParams } from '../../../core/models/paginateParams.interface';
import { TranslateService } from '@ngx-translate/core';
import { IndexInterface } from '../Base-Interface/Index.Interface';
import { GlobalConfig } from '../../../core/Global/global.config';
import { BaseService } from '../../../core/services/Base/base.service';
import { ModelBase } from '../../../core/models/Base/base.model';
import { Base64DownloadHelperService } from '../../../core/services/Helpers/base64.download.helper.service';
import { AuthNoticeService } from '../../../core/services/auth-notice.service';
import { HelperService } from '../../../core/services/helper.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'kt-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

	@Input() isLoadingResults = false;
	@Input() HasAdd = false;
	@Input() AddBtnParam = '';
	@Input() ButtonAddName = '';
	@Input() ButtonAddUrl = '';

	@Input() HasItemPerPage = false;

	@Input() HasActive = false;

	@Input() HasSearchFilter = false;
	@Input() SearchFilterTitle = '';

	@Input() ApiRoute = '';
	@Input() HeaderTitle = '';

	@Input() currentComponent;
	@Input() gridList;

	@Output() myEvent = new EventEmitter();

	search_filter = null;
	@Input() headerParams: PaginateParams = {
		active: 1,
		per_page: GlobalConfig.pagination_per_page,
		search_key: null,
		sort_key: null,
		sort_order: null,
		next_page_index: null
	};

	@Input() HasExport = false;

	@Input() currentService: BaseService<ModelBase> = null;
	lang: string = 'en'
	currentList: [] = []

	constructor(private translateService: TranslateService,
		private authNoticeService: AuthNoticeService,
		private _langService: LangService,
		private cdr: ChangeDetectorRef,
		private helper: HelperService) {
	}


	ngOnInit() {
		this.checkLocalLang()
		this.currentList = this.gridList
	}

	// change records per page
	public perPageChange() {
		// localStorage.setItem('pagination_per_page', this.headerParams.per_page);

		this.currentComponent.get(this.headerParams);
	}

	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}
	toLang(param) {
		return this.lang == 'en' ? param.en : param.ar;
	}

	// Filter Datatable based on filter Input
	FilterDataTable(searchTerm: string) {
		searchTerm = searchTerm.trim().toLowerCase();

		// filter gridList
		// if (this.gridList) {
		// 	if (!searchTerm) {
		// 		return this.currentComponent.dataList = this.currentList
		// 	}
		// 	this.currentComponent.dataList = this.currentList.filter((item: any) => {
		// 		return item.name[this.lang].toLowerCase().includes(searchTerm)
		// 	});
		// 	return
		// }

		// filter DataSource Table
		const DataSource = this.currentComponent.Data_Source;
		this.currentComponent.dataSource$ = new MatTableDataSource(DataSource.filter((item) => {
			if(typeof item.name == 'string'){ // only name without object of lang
				return item.name.toLowerCase().includes(searchTerm)
			}
			return item.name[this.lang].toLowerCase().includes(searchTerm)
		}));

		if (this.currentComponent.dataSource$.paginator) {
			this.currentComponent.dataSource$.paginator.firstPage();
		}
	}

	// toggle status from Active , InActive , All Status
	toggleStatus(number: number) {
		if (number == 1) { this.headerParams.active = '1'; }
		else if (number == 0) { this.headerParams.active = '0'; }
		else { this.headerParams.active = null; }

		this.currentComponent.filterListByParam(this.headerParams)
	}

	export() {
		this.currentService.exportExcelSheet(this.headerParams).subscribe(res => {
			if (res) {
				Base64DownloadHelperService.downloadFile(
					res.link,
					'Reports.xlsx');
			}
		}, handler => {
			this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
		});
	}



	ngOnDestroy(): void {
		this.search_filter = null;
	}
}
