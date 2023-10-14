import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { RolesService } from './../../../../../core/services/ACL-Module/roles.service';
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
	rolesData: any[];
	displayedColumns: string[] = ['name', 'key', 'is_active', 'options'];
	isLoadingResults: boolean
	constructor(
		private _rolesService: RolesService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.getListData(this.headerParams)
		this._rolesService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}
	filterList = (param)=>{
		this.getListData(param)
	}

	getListData(headerParams) {
		this._rolesService.list(headerParams).subscribe((resp) => {
			console.log(resp.body);
			this.rolesData = resp.body
			// this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
