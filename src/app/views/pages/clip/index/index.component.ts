import { TranslateService } from '@ngx-translate/core';
import { DeleteModalComponent } from './../../../shared/delete-modal/delete-modal.component';
import { LangService } from './../../../../core/services/lang.service';
import { ClipsService } from './../../../../core/services/Clips-Module/clips.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PaginateParams } from '../../../../core/models/paginateParams.interface';
import { GlobalConfig } from '../../../../core/Global/global.config';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {
	@ViewChild('paginator', { static: true }) paginator: MatPaginator;
	@ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

	dataSource$;
	isLoadingResults: boolean = true;
	Data_Source: any;
	dataSourceWithPageSize;
	displayedColumns: string[] = ['name', 'companies', 'content_images', 'genres', 'clip_status', 'options'];
	lang: string = 'en';

	// //filter variables
	// headerParams: PaginateParams = {
	// 	active: 1,
	// 	per_page: GlobalConfig.pagination_per_page,
	// 	search_key: null,
	// 	sort_key: null,
	// 	sort_order: null,
	// 	next_page_index: 0,
	// };
	//filter variables
	headerParams: PaginateParams = {
		active: 1,
		is_pagination:1
	};
	constructor(
		private _langService: LangService,
		private _clipsService: ClipsService,
		private cdr: ChangeDetectorRef,
		public dialog: MatDialog,
		private translate: TranslateService,
		private _toaster: ToastrService
	) { }

	filterList = (filterParam) => {
		console.log(filterParam);

		this.getListData(filterParam)
	}
	ngOnInit() {
		this.checkLocalLang()
		this.getListData(this.headerParams)
		this._clipsService.isListChanged.subscribe((isChanged) => {
			if (isChanged) {
				this.getListData(this.headerParams)
			}
		})
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
	getListData(filterParam?:PaginateParams) {
		this._clipsService.list(filterParam).subscribe((resp) => {
			this.dataSource$ = new MatTableDataSource(resp.body)
			this.Data_Source = resp.body;
			this.paginationTable();
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
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
				this._clipsService.delete(id).subscribe((res: any) => {
					this._clipsService.isListChanged.next(true);
					this._toaster.success(res.message)
				}, handler => {
					this._toaster.error(handler.error?.error)
				});
			}
		});
	}
	applySpecificFilter(value) {
		console.log('value', value);
		return
	}
	paginationTable() {
		this.dataSourceWithPageSize = new MatTableDataSource(this.Data_Source);
		this.dataSource$.paginator = this.paginator;
		this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
	}

}
