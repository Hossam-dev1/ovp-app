import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SeasonsService } from './../../../../../core/services/Series-Module/seasons.service';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {

	isLoadingResults: boolean = true;
	displayedColumns: string[] = ['id', 'name', 'series_name', 'no_of_episodes', 'status', 'options'];
	seasonsData: Observable<any[]>;
	series_ID: number;

	constructor(
		private _seasonsService: SeasonsService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.getListData()
		this.route.queryParams.subscribe((params) => {
			this.series_ID = params.series
			console.log(this.series_ID);

		});
		this._seasonsService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData()
			}
		})
	}


	getListData() {
		this._seasonsService.list().subscribe((resp) => {
			this.seasonsData = resp.body
			console.log(this.seasonsData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
