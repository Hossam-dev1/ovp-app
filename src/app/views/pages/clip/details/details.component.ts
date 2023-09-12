import { ActivatedRoute } from '@angular/router';
import { ClipsService } from './../../../../core/services/Clips-Module/clips.service';
import { LangService } from './../../../../core/services/lang.service';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'kt-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
	clip_ID: number;
	clipDetails: any;
	isLoading: boolean = true;
	lang: string = 'en';
	headersData: string[] = ['name', 'description', 'clip_year', 'clip_duration', 'clip_puplish_date', 'clip_puplish_end_date', 'clip_watch_rating']
	companiesData;

	constructor(
		private _langService: LangService,
		private _clipsService: ClipsService,
		private cdr: ChangeDetectorRef,
		private _activatedRoute: ActivatedRoute,

	) { }

	ngOnInit() {
		this.clip_ID = Number(this._activatedRoute.snapshot.paramMap.get('id'))
		this.getClipDetails()
		this.checkLocalLang()
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
	getClipDetails() {
		this._clipsService.show(this.clip_ID).subscribe((resp: any) => {
			this.clipDetails = resp.body;
			console.log('clipDetails', this.clipDetails);
			this.companiesData = this.clipDetails.companies;
			this.isLoading = false
			this.cdr.markForCheck()
			// console.log(resp.body);
		})
	}
}

