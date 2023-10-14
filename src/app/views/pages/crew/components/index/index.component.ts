import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
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
	crewData: Observable<any[]>;
	displayedColumns: string[] = ['name', 'nationality', 'types', 'thumb', 'options'];

	constructor(
		private _crewService: CrewService,
		private cdr: ChangeDetectorRef
	) { }

	filterList = (param) => {
		this.getListData(param)
	}
	ngOnInit() {
		this.getListData(this.headerParams)
		this._crewService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}

	getListData(param?) {
		this._crewService.list(param).subscribe((resp) => {
			this.crewData = resp.body
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
