import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
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
	crewTypesData: Observable<any[]>;
	displayedColumns = ['nameEn', 'nameAr', 'options'];

	constructor(
		private _crewTypeService: CrewTypeService,
		private cdr: ChangeDetectorRef
	) { }

	filterList = (param) => {
		this.getListData(param)
	}
	ngOnInit() {
		this.getListData(this.headerParams)
		this._crewTypeService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}

	getListData(param?) {
		this._crewTypeService.list(param).subscribe((resp) => {
			this.crewTypesData = resp.body
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
