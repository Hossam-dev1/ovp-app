import { HelperService } from './../../../../../core/services/helper.service';
import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { ClipsService } from './../../../../../core/services/Clips-Module/clips.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {
	isLoadingResults: boolean = true;
	Data_Source: any;
	displayedColumns: string[] = ['name', 'genres', 'clip_year', 'clip_puplish_date', 'companies', 'content_images', 'is_featured',  'options'];
	contentTypeList: any[] = []
	contentTypeID: number;
	contentTypeKey: string = 'plays'

	headerParams: PaginateParams = {
		active: 1,
		is_pagination: 1
	};
	constructor(
		private _clipsService: ClipsService,
		private cdr: ChangeDetectorRef,
		public dialog: MatDialog,
		private _helperService: HelperService,
	) { }

	filterList = (param) => {
		this.getListData(param)
	}

	ngOnInit() {
		this.getContentType();
		this._clipsService.isListChanged.subscribe((isChanged) => {
			if (isChanged) {
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

	getListData(filterParam?: PaginateParams) {
		this._clipsService.list(filterParam).subscribe((resp) => {
			this.Data_Source = resp.body.filter((item) =>
				item.content_type_id == this.contentTypeID
			);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
