import { LangService } from './../../../../../core/services/lang.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { GenreService } from '../../../../../core/services/Genre-Module/genre.service';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnChanges {
	displayedColumns = ['id', 'key', 'name', 'options'];
	dataSource = new MatTableDataSource([]);;
	isLoadingResults: boolean = false;

	// pagination variables
	resultsLength = 0;
	pageIndex = 0;
	lang: string = 'en'
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;



	constructor(
		private genreService: GenreService,
		private cdr: ChangeDetectorRef,
		private _toastr: ToastrService,
		private _langService: LangService

	) { }

	ngOnInit() {
		this.getData()
		this.checkLocalLang();
	}


	ngOnChanges() {
		this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator;
	}

	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}
	getData() {
		this.isLoadingResults = true;
		this.genreService.list().subscribe((resp) => {
			this.dataSource = new MatTableDataSource(resp.body)
			this.isLoadingResults = false;
			this.cdr.detectChanges();
			console.log(this.paginator);
			this.ngOnChanges()
		})
	}

	deleteGenre(id: number) {
		this.genreService.delete(id).subscribe((resp: any) => {
			console.log(resp);
			this._toastr.success(resp.message + ' successfully');
			this.getData();
		})
	}
	public pagination(event?: PageEvent) {
		// this.pageIndex = event?.pageIndex;
	}
}
