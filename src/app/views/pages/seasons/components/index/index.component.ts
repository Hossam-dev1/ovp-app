import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SeasonsService } from './../../../../../core/services/Series-Module/seasons.service';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {

	isLoadingResults: boolean = true;
	displayedColumns: string[] = ['name', 'series_name', 'no_of_episodes', 'status', 'options'];
	seasonsData: Observable<any[]>;
	series_ID: number;

	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};
	constructor(
		private _seasonsService: SeasonsService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
	) { }

	filterList = (param) => {
		this.getListData(param)
	}
	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.series_ID = params.series
			this.getListData(this.headerParams)
		});
		this._seasonsService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}


	getListData(param: PaginateParams) {
		this._seasonsService.list(param, this.series_ID).subscribe((resp) => {
			this.seasonsData = resp.body
			console.log(this.seasonsData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
