import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { NationalitiesService } from './../../../../../core/services/Crew-Module/nationalities.service';
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
	nationalitiesData: Observable<any[]>;
	displayedColumns = ['nameEn', 'nameAr', 'options'];

	constructor(
		private _nationalitiesService: NationalitiesService,
		private cdr: ChangeDetectorRef
	) { }

	filterList = (param) => {
		this.getListData(param)
	}
	ngOnInit() {
		this.getListData(this.headerParams)
		this._nationalitiesService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}

	getListData(param?) {
		this._nationalitiesService.list(param).subscribe((resp) => {
			this.nationalitiesData = resp.body
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
