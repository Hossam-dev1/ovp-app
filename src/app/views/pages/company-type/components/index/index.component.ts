import { CompanyTypeService } from './../../../../../core/services/Clips-Module/company-type.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

CompanyTypeService
@Component({
  selector: 'kt-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	isLoadingResults: boolean = true;
	companyTypesData: Observable<any[]>;
	displayedColumns: string[] = ['id', 'key', 'name', 'options'];

	constructor(
		private _companyTypeService: CompanyTypeService,
		private cdr: ChangeDetectorRef
		) { }

	ngOnInit() {
		this.getListData()
		this._companyTypeService.isListChanged.subscribe((resp)=>{
			if(resp){
				this.getListData()
			}
		})
	}

	getListData() {
		this._companyTypeService.list().subscribe((resp) => {
			this.companyTypesData = resp.body
			console.log(this.companyTypesData);

			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
