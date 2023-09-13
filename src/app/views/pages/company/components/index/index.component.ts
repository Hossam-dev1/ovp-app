import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'kt-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

	isLoadingResults: boolean = true;
	companiesData: Observable<any[]>;
	displayedColumns: string[] = ['name', 'company_types', 'logo', 'options'];

	constructor(
		private _companiesService: CompanyService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.getListData()
		this._companiesService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData()
			}
		})
	}

	getListData() {
		this._companiesService.list().subscribe((resp) => {
			this.companiesData = resp.body
			console.log(this.companiesData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
