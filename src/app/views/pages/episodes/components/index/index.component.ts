import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { EpisdosService } from './../../../../../core/services/Series-Module/episdos.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {

	isLoadingResults: boolean = true;
	displayedColumns: string[] = ['name', 'status', 'options'];
	episodesData: Observable<any[]>;
	series_ID: number;
	seasons_ID: number;

	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};
	constructor(
		private _episodesService: EpisdosService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
	) { }

	filterList = (param) => {
		this.getListData(param)
	}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.series_ID = params.series
			this.seasons_ID = params.seasons
			this.getListData(this.headerParams)
		});
		this._episodesService.isListChanged.subscribe((resp) => {
			return resp ? this.getListData(this.headerParams) : false
		})
	}

	getListData(param) {
		this._episodesService.list(param, this.seasons_ID).subscribe((resp) => {
			this.episodesData = resp.body
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
