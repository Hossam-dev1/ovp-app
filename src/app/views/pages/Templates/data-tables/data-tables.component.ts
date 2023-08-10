import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

export interface ITableFilter {
	column: string;
	value: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
const ELEMENT_DATA2: PeriodicElement[] = [
	{position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'kt-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent  implements OnInit  {
	dataSource;
	resultsLength = 20;
	pageIndex = 0;
	filter: ITableFilter[] = [];
	pageSize = 10;
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	isLoadingResults = true;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	constructor() {
		// Assign the data to the data source for the table to render
		this.dataSource =  new MatTableDataSource(ELEMENT_DATA);
		this.isLoadingResults = false;
	}

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.filterPredicate = this.customFilterPredicate;
	}

	applySpecificFilter(columnNames , value) {
		let found = 0;
		for (let i = 0; i < this.filter.length; i++) {
			if(this.filter[i].column == columnNames) {
				this.filter[i].value = value;
				found = 1;
			}
		}
		if(found == 0) {
			this.filter.push({column: columnNames, value: value});
		}
		this.dataSource.filter = this.filter;
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	// set specific filter columns
	customFilterPredicate(data: any, filters: ITableFilter[]): boolean {
		for (let i = 0; i < filters.length; i++) {
			let column = filters[i].column;
			let value = filters[i].value;
			const fitsThisFilter =  (data[column]+ '').includes(value);
			if (!fitsThisFilter) {
				return false;
			}
		}
		return true;
	}

	// get data form server
	public getServerData(event?:PageEvent){
		this.dataSource = new MatTableDataSource(ELEMENT_DATA2);
		this.pageIndex = this.pageIndex + 1;
	}

}

