import { CategoriesService } from './../../../../../core/services/Clips-Module/categories.service';
import { Observable } from 'rxjs';
import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {
	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};
	isLoadingResults: boolean = true;
	categoriesData: Observable<any[]>;
	displayedColumns: string[] = ['nameEn', 'nameAr', 'parent', 'options'];

	constructor(
		private _categoriesService: CategoriesService,
		private cdr: ChangeDetectorRef
	) { }

	filterList = (param) => {
		this.getListData(param)
	}
	ngOnInit() {
		this.getListData(this.headerParams)
		this._categoriesService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}

	getListData(param?) {
		this._categoriesService.list(param).subscribe((resp) => {
			this.categoriesData = resp.body
			console.log(this.categoriesData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
