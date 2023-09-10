import { SeasonsService } from './../../../../../core/services/Series-Module/seasons.service';
import { SeriesService } from './../../../../../core/services/Series-Module/series.service';
import { LangService } from './../../../../../core/services/lang.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'kt-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
	series_ID: number;
	seriesDetails: any;
	seasonsList: any;
	isLoading: boolean = true;
	lang: string = 'en';
	headersData: string[] = ['name', 'description', 'series_start_year', 'slug']

	constructor(
		private _langService: LangService,
		private _seriesService: SeriesService,
		private _seasonsService: SeasonsService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute,
	) { }

	ngOnInit() {
		this.checkLocalLang()
		this.series_ID = Number(this._activatedRoute.snapshot.paramMap.get('id')) as number
		this.getSeriesDetails()
		this.getSeasonsList()
	}
	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}
	toLang(param) {
		return this.lang == 'en' ? param.en : param.ar;
	}
	getSeriesDetails() {
		this._seriesService.show(this.series_ID).subscribe((resp: any) => {
			this.seriesDetails = resp.body;
			console.log('seriesDetails', this.seriesDetails);
			this.isLoading = false
			this.cdr.markForCheck()
		})
	}

	getSeasonsList() {
		this._seasonsService.list(this.series_ID).subscribe((resp: any) => {
			this.seasonsList = resp.body;
			console.log('seasonsList', this.seasonsList);
			this.isLoading = false
			this.cdr.markForCheck()
		})
	}
}

