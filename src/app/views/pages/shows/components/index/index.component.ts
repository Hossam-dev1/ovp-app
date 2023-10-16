import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { HelperService } from './../../../../../core/services/helper.service';
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
	showsData: Observable<any[]>;
	displayedColumns: string[] = ['name', 'genres', 'series_no_of_seasons', 'series_status', 'is_featured', 'options'];
	contentTypeList: any[] = []
	contentTypeID: number;
	contentTypeKey: string = 'shows'

	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};

	constructor(
		private _seriesService: SeriesService,
		private cdr: ChangeDetectorRef,
		private _helperService: HelperService,
	) { }

	filterList = (param) => {
		this.getListData(param)
	}

	ngOnInit() {
		this.getContentType()
		this._seriesService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}

	getContentType() {
		this._helperService.contentTypesList().subscribe((resp) => {
			this.contentTypeList = resp.body;
			this.contentTypeList.forEach(item => {
				if (item['key'] == this.contentTypeKey) {
					this.contentTypeID = item.id
				}
			});
			this.getListData(this.headerParams);
		})
	}

	getListData(filterParam?) {
		this._seriesService.list(filterParam).subscribe((resp) => {
			this.showsData = resp.body.filter((item) =>
				item.content_type_id == this.contentTypeID
			);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
