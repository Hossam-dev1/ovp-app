import { EpisdosService } from './../../../../../core/services/Series-Module/episdos.service';
import { LangService } from './../../../../../core/services/lang.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kt-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {


	episodes_ID: number;
	seriesDetails: any;
	episodesDetails: any;
	isLoading: boolean = true;
	lang: string = 'en';
	headersData: string[] = ['name', 'description', 'content_provider', 'number', 'duration', 'publish_date', 'publish_end_date']

	constructor(
		private _langService: LangService,
		private _episodesService: EpisdosService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute,
	) { }

	ngOnInit() {
		this.checkLocalLang()
		this.episodes_ID = Number(this._activatedRoute.snapshot.paramMap.get('id')) as number
		this.getEpisodesDetails()
	}
	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.detectChanges();
		})
	}
	toLang(param, header?) {
		if(header == 'content_provider'){
			return this.lang == 'en' ? param['name'].en : param['name'].ar;
		}
		return this.lang == 'en' ? param?.en || '---' : param?.ar || '---' ;
	}
	getEpisodesDetails() {
		this._episodesService.show(this.episodes_ID).subscribe((resp: any) => {
			this.episodesDetails = resp.body;
			console.log('episodesDetails', this.episodesDetails.crews);
			this.isLoading = false
			this.cdr.markForCheck()
		})
	}
}

