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

	season_ID: number;
	seriesDetails: any;
	seasonDetails: any;
	isLoading: boolean = true;
	lang: string = 'en';
	headersData: string[] = ['name', 'description', 'year', 'no_of_episodes', 'rate', 'content_provider']

	constructor(
		private _langService: LangService,
		private _seasonsService: SeasonsService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute,
	) { }
	check(param) {
		console.log(param);

	}
	ngOnInit() {
		this.checkLocalLang()
		this.season_ID = Number(this._activatedRoute.snapshot.paramMap.get('id')) as number
		this.getSeasonsDetails()
	}
	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}
	toLang(param, header) {
		if(header == 'content_provider'){
			return this.lang == 'en' ? param['name'].en : param['name'].ar;
		}
		return this.lang == 'en' ? param.en : param.ar;
	}
	getSeasonsDetails() {
		this._seasonsService.show(this.season_ID).subscribe((resp: any) => {
			this.seasonDetails = resp.body;
			console.log('seasonDetails', this.seasonDetails);
			this.isLoading = false
			this.cdr.markForCheck()
		})
	}
}

