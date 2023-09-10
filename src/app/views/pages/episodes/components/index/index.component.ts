import { EpisdosService } from './../../../../../core/services/Series-Module/episdos.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {

	isLoadingResults: boolean = true;
	displayedColumns: string[] = ['id', 'name', 'status', 'options'];
	episodesData: Observable<any[]>;
	series_ID: number;
	seasons_ID: number;

	constructor(
		private _episodesService: EpisdosService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.getListData()
		this.route.queryParams.subscribe((params) => {
			this.series_ID = params.series
			this.seasons_ID = params.seasons
		});
		this._episodesService.isListChanged.subscribe((resp) => {
			return resp ? this.getListData() : false
		})
	}

	getListData() {
		this._episodesService.list().subscribe((resp) => {
			this.episodesData = resp.body
			console.log(this.episodesData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
