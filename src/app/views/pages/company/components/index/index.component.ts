import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
	companiesData: Observable<any[]>;
	displayedColumns: string[] = ['name', 'company_types', 'logo', 'options'];

	constructor(
		private _companiesService: CompanyService,
		private cdr: ChangeDetectorRef
	) { }

	filterList = (param) => {
		this.getListData(param)
	}
	ngOnInit() {
		this.getListData(this.headerParams)
		this._companiesService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}

	getListData(param?) {
		this._companiesService.list(param).subscribe((resp) => {
			this.companiesData = resp.body
			console.log(this.companiesData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
