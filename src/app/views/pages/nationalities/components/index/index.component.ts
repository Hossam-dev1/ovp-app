import { MatTableDataSource } from '@angular/material/table';
import { NationalitiesService } from './../../../../../core/services/Crew-Module/nationalities.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
	isLoadingResults: boolean = true;
	nationalitiesData: Observable<any[]>;
	displayedColumns: string[] = ['name', 'options'];


	constructor(
		private _nationalitiesService: NationalitiesService,
		private cdr: ChangeDetectorRef
		) { }

	ngOnInit() {
		this.getListData()
		this._nationalitiesService.isListChanged.subscribe((resp)=>{
			if(resp){
				this.getListData()
			}
		})
	}

	getListData() {
		this._nationalitiesService.list().subscribe((resp) => {
			this.nationalitiesData = resp.body
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
