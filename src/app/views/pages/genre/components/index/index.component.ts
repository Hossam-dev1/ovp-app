import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LangService } from './../../../../../core/services/lang.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { GenreService } from '../../../../../core/services/Genre-Module/genre.service';
import { ToastrService } from 'ngx-toastr';
MatPaginator
@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};
	displayedColumns = ['nameEn', 'nameAr', 'options'];
	dataSource = new MatTableDataSource([]);;
	isLoadingResults: boolean = false;
	genresData: [] = []
	// pagination variables
	resultsLength = 0;
	pageIndex = 0;
	lang: string = 'en'
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private _genreService: GenreService,
		private cdr: ChangeDetectorRef,
		private _toastr: ToastrService,
		private _langService: LangService

	) { }

	filterList = (param) => {
		this.getData(param)
	}
	ngOnInit() {
		this.getData(this.headerParams)
		this._genreService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getData(this.headerParams)
			}
		})
	}

	getData(param?) {
		this.isLoadingResults = true;
		this._genreService.list(param).subscribe((resp) => {
			this.genresData = resp.body;
			this.dataSource = resp.body
			this.isLoadingResults = false;
			this.cdr.detectChanges();
		})
	}

}
