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

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@Input() Data_Source: any;
	@Input() Displayed_Columns: any;
	@Input() isLoading_Results: boolean;
	@Input() title: string;
	@Input() route_path:any

	dataSource$;
	resultsLength = 20;
	pageIndex = 0;
	// filter: ITableFilter[] = [];
	pageSize = 10;
	tableHeaders: string[] = [];
	displayedColumns:any
	isLoading = true;
	lang: string = 'en';


	constructor(
		private _langService: LangService,
		private cdr: ChangeDetectorRef,
		private _nationalitiesService: NationalitiesService,
		private _crewTypeService: CrewTypeService,
		private _crewService: CrewService,
		private _companyTypeService: CompanyTypeService,
		private _toaster: ToastrService

	) {
		// Assign the data to the data source for the table to render
		// this.dataSource =  new MatTableDataSource(ELEMENT_DATA);
	}

	ngOnInit() {
		this.checkLocalLang()
		// this.dataSource.sort = this.sort;
		// this.dataSource.filterPredicate = this.customFilterPredicate
	}

	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.Data_Source.currentValue) {
			this.dataSource$ = new MatTableDataSource(this.Data_Source)
			this.tableHeaders = this.Displayed_Columns;
			this.isLoading = false;
		}
	}

	applySpecificFilter(columnNames, value) {
		// let found = 0;
		// for (let i = 0; i < this.filter.length; i++) {
		// 	if(this.filter[i].column == columnNames) {
		// 		this.filter[i].value = value;
		// 		found = 1;
		// 	}
		// }
		// if(found == 0) {
		// 	this.filter.push({column: columnNames, value: value});
		// }
		// this.dataSource.filter = this.filter;
		// if (this.dataSource.paginator) {
		// 	this.dataSource.paginator.firstPage();
		// }
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
		// this.dataSource = new MatTableDataSource(ELEMENT_DATA2);
		this.pageIndex = this.pageIndex + 1;
	}

	deleteColumn(id: number) {
		if (this.title == 'Nationalities') {
			this._nationalitiesService.deleteNationalityById(id).subscribe((res: any) => {
				this._toaster.success(res.message)
				this._nationalitiesService.isListChanged.next(true);
				this.cdr.detectChanges();
			})
		} else if (this.title == 'Crew Type') {
			this._crewTypeService.delete(id).subscribe((res: any) => {
				this._toaster.success(res.message)
				this._crewTypeService.isListChanged.next(true);
				this.cdr.detectChanges();
			})
		} else if (this.title == 'Crew') {
			this._crewService.delete(id).subscribe((res: any) => {
				this._toaster.success(res.message)
				this._crewService.isListChanged.next(true);
				this.cdr.detectChanges();
			})
		}
		else if (this.title == 'Company Types') {
			this._companyTypeService.delete(id).subscribe((res: any) => {
				this._toaster.success(res.message)
				this._companyTypeService.isListChanged.next(true);
				this.cdr.detectChanges();
			})
		}
	}

}

