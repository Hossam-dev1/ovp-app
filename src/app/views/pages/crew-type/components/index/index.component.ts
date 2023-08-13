import { CrewTypeService } from './../../../../../core/services/Crew-Module/crew-type.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	isLoadingResults: boolean = true;
	crewTypesData: Observable<any[]>;
	displayedColumns: string[] = ['id', 'key', 'name', 'options'];

	constructor(
		private _crewTypeService: CrewTypeService,
		private cdr: ChangeDetectorRef
		) { }

	ngOnInit() {
		this.getListData()
		this._crewTypeService.isListChanged.subscribe((resp)=>{
			if(resp){
				this.getListData()
			}
		})
	}

	getListData() {
		this._crewTypeService.list().subscribe((resp) => {
			this.crewTypesData = resp.body
			console.log(this.crewTypesData);

			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
