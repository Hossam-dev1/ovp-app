import { PaginateParams } from './../../../../../core/models/paginateParams.interface';
import { AdminsService } from './../../../../../core/services/User-Module/admins.service';
import { ChangeDetectorRef, Component } from '@angular/core';

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
	adminsData:any [];
	displayedColumns: string[] = ['name', 'email', 'roles', 'is_active','options'];
	isLoadingResults:boolean
	constructor(
		private _adminsService: AdminsService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.getListData(this.headerParams)
		this._adminsService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData(this.headerParams)
			}
		})
	}
	filterList = (filterParam) => {
		this.getListData(filterParam)
	}

	getListData(headerParams) {
		this._adminsService.list(headerParams).subscribe((resp) => {
			console.log(resp.body);
			this.adminsData = resp.body
			// this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
