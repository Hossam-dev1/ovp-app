import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesService } from './../../../../../core/services/Series-Module/series.service';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {

	isLoadingResults: boolean = true;
	seriesData: Observable<any[]>;
	displayedColumns: string[] = ['name', 'genres', 'series_no_of_seasons', 'series_status', 'is_featured', 'options'];

	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};

	constructor(
		private _seriesService: SeriesService,
		private cdr: ChangeDetectorRef
	) { }
	filterList = (param) => {
		this.getListData(param)
	}

	ngOnInit() {
		this.getListData(this.headerParams)
		this._seriesService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}

	getListData(param?) {
		this._seriesService.list(param).subscribe((resp) => {
			this.seriesData = resp.body
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
