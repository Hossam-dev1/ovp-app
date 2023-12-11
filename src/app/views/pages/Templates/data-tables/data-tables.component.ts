import { CollectionService } from './../../../../core/services/Collection-Module/collection.service';
import { TagService } from './../../../../core/services/Clips-Module/tags.service';
import { CategoriesService } from './../../../../core/services/Clips-Module/categories.service';
import { RolesService } from './../../../../core/services/ACL-Module/roles.service';
import { AdminsService } from './../../../../core/services/User-Module/admins.service';
import { SeasonsService } from './../../../../core/services/Series-Module/seasons.service';
import { SeriesService } from './../../../../core/services/Series-Module/series.service';
import { EpisdosService } from './../../../../core/services/Series-Module/episdos.service';

import { GenreService } from './../../../../core/services/Genre-Module/genre.service';
import { HelperService } from './../../../../core/services/helper.service';
import { AuthNoticeService } from './../../../../core/services/auth-notice.service';
import { TranslateService } from '@ngx-translate/core';
import { DeleteModalComponent } from './../../../shared/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ContentProviderService } from './../../../../core/services/Clips-Module/content-provider.service';
import { CompanyTypeService } from './../../../../core/services/Clips-Module/company-type.service';
import { CrewService } from './../../../../core/services/Crew-Module/crew.service';
import { CrewTypeService } from './../../../../core/services/Crew-Module/crew-type.service';
import { NationalitiesService } from './../../../../core/services/Crew-Module/nationalities.service';
import { LangService } from './../../../../core/services/lang.service';
import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './../../../../core/services/Clips-Module/company.service';
import { PaginateParams } from '../../../../core/models/paginateParams.interface';
import { GlobalConfig } from '../../../../core/Global/global.config';
export interface ITableFilter {
	column: string;
	value: any;
}
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
	selector: 'kt-data-tables',
	templateUrl: './data-tables.component.html',
	styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent implements OnInit, OnChanges {

	@ViewChild('paginator', { static: true }) paginator: MatPaginator;
	@ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@Input() Data_Source: any;
	@Input() Displayed_Columns: any;
	@Input() isLoading_Results: boolean;
	@Input() title: string;
	@Input() route_path: any = ''
	@Input() path_param: any
	@Input() dynamicServiceName: string;
	@Input() dynamicComponentName: any;

	dataSource$: MatTableDataSource<any>;
	dataSourceWithPageSize;
	resultsLength = 20;
	pageIndex = 0;
	filter: any;
	pageSize = 5;
	tableHeaders: string[] = [];
	displayedColumns: any
	isLoading = true;
	isInActiveList: boolean = false;
	lang: string = 'en';

	//filter variables
	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1,
		per_page: GlobalConfig.pagination_per_page,
		search_key: null,
		sort_key: null,
		sort_order: null,
		next_page_index: 0,
	};

	constructor(
		private _langService: LangService,
		private cdr: ChangeDetectorRef,
		private helper: HelperService,
		private authNoticeService: AuthNoticeService,
		private _seriesService: SeriesService,
		private _tagsService: TagService,
		private _seasonsService: SeasonsService,
		private _eposidesService: EpisdosService,
		private _nationalitiesService: NationalitiesService,
		private _genereService: GenreService,
		private _contentProviderService: ContentProviderService,
		private _crewTypeService: CrewTypeService,
		private _crewService: CrewService,
		private _companyTypeService: CompanyTypeService,
		private _companyService: CompanyService,
		private _adminsService: AdminsService,
		private _rolesService: RolesService,
		private _categoriesService: CategoriesService,
		private _collectionsService: CollectionService,
		private _toaster: ToastrService,
		public dialog: MatDialog,
		private translate: TranslateService
	) {
		// Assign the data to the data source for the table to render
		// this.dataSource =  new MatTableDataSource(ELEMENT_DATA);
	}

	ngAfterViewInit() {
	}
	ngOnInit() {
		this.checkLocalLang()

	}
	check(param) {
		console.log(param);
	}
	filterListByParam = (param) => {
		this.isLoading = true
		// inActive
		this.isInActiveList = param.active == '0' ? true : false
		this.dynamicComponentName.filterList(param);
	}

	dynamicParam(key, value): any {
		const obj = {};
		obj[key] = value;
		return obj;
	}

	toLang(param) {
		return this.lang == 'en' ? param.en : param.ar;
	}

	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.Data_Source?.currentValue) {
			this.dataSource$ = new MatTableDataSource(this.Data_Source)
			this.tableHeaders = this.Displayed_Columns;
			this.dataSourceWithPageSize = new MatTableDataSource(this.Data_Source);
			this.dataSource$.paginator = this.paginator;
			this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
			this.isLoading = false;
		}
	}

	applySpecificFilter(columnNames, value: string) {
		this.dataSource$ = new MatTableDataSource(this.Data_Source.filter((item) => item['name'][this.lang].includes(value)))
		this.cdr.detectChanges();

		if (this.dataSource$.paginator) {
			this.dataSource$.paginator.firstPage();
		}
	}

	// set specific filter columns
	customFilterPredicate(data: any, filters: ITableFilter[]): boolean {
		for (let i = 0; i < filters.length; i++) {
			let column = filters[i].column;
			let value = filters[i].value;
			const fitsThisFilter = (data[column] + '').includes(value);
			if (!fitsThisFilter) {
				return false;
			}
		}
		return true;
	}

	// get data form server
	public getServerData(event?: PageEvent) {
		this.pageIndex = this.pageIndex + 1;
	}

	get dynamicService() {
		return this[this.dynamicServiceName];
	}

	deleteColumn(id: number, elem) {
		const dialogRef = this.dialog.open(DeleteModalComponent, {
			width: '40rem',
			data: {
				title: this.translate.instant('COMMON.Delete_Title', {
					name: elem.name[this.lang] || '',
				}),
				body: this.translate.instant('COMMON.Delete_Body', {
					name: elem.name[this.lang] || '',
					id: id
				}),
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.dynamicService.delete(id).subscribe(res => {
					// this.authNoticeService.setNotice(this.translate.instant('COMMON.Deleted_successfully', {
					// 	name: 'delete'}), 'success');
					this.dynamicService.isListChanged.next(true);
					this._toaster.success(res.message)
				}, handler => {
					this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
					// this.deletedItem = null;
					this._toaster.error(handler.error?.error)
				});
			}
		});
	}

}

