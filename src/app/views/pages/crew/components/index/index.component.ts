import { CrewService } from './../../../../../core/services/Crew-Module/crew.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	isLoadingResults: boolean = true;
	crewData: Observable<any[]>;
	displayedColumns: string[] = ['id', 'name', 'nationality', 'types', 'thumb', 'options'];

	constructor(
		private _crewTypeService: CrewService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.getListData()
		this._crewTypeService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData()
			}
		})
	}

	getListData() {
		this._crewTypeService.list().subscribe((resp) => {
			this.crewData = resp.body
			console.log(this.crewData);

			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}

}
