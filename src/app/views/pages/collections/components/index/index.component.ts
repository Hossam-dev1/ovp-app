import { CollectionService } from './../../../../../core/services/Collection-Module/collection.service';
import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
	isLoadingResults: boolean = true;
	collectionsData: Observable<any[]>;
	displayedColumns: string[] = ['name', 'sorting_order', 'device_type', 'display_type', 'options'];

	constructor(
		private _collectionsData: CollectionService,
		private cdr: ChangeDetectorRef
	) { }

	filterList = (param) => {
		this.getListData(param)
	}
	ngOnInit() {
		this.getListData(this.headerParams)
		this._collectionsData.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}

	getListData(param?) {
		this._collectionsData.list(param).subscribe((resp) => {
			this.collectionsData = resp.body
			console.log(this.collectionsData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
