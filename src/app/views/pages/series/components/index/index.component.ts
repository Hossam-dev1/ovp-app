import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesService } from './../../../../../core/services/Series-Module/series.service';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {

	isLoadingResults: boolean = true;
	seriesData: Observable<any[]>;
	displayedColumns: string[] = ['id', 'name', 'genres', 'series_no_of_seasons', 'series_status', 'options'];


	constructor(
		private _seriesService: SeriesService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.getListData()
		this._seriesService.isListChanged.subscribe((resp) => {
			if (resp) {
				this.getListData()
			}
		})
	}

	getListData() {
		this._seriesService.list().subscribe((resp) => {
			this.seriesData = resp.body
			console.log(this.seriesData);
			this.isLoadingResults = false
			this.cdr.detectChanges();
		})
	}
}
