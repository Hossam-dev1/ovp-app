import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { SeasonsService } from './../../../../../core/services/Series-Module/seasons.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SeriesService } from './../../../../../core/services/Series-Module/series.service';
import { TagService } from './../../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../../core/services/Clips-Module/content-provider.service';
import { ActivatedRoute } from '@angular/router';
import { LangService } from './../../../../../core/services/lang.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GenreService } from './../../../../../core/services/Genre-Module/genre.service';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent {

	selectedValues: number[] = [2, 4, 6];

	isLoading: boolean = false;
	// isStarChecked: boolean = false;
	isStatusChecked: boolean = false;
	clearValue: boolean
	seasons_ID: number;
	lang: string = 'en'
	selectedSeasonsYear: string

	constructor(
		private fb: FormBuilder,
		private _langService: LangService,
		private _seasonsService: SeasonsService,
		private _companiesSerivce: CompanyService,
		private cdr: ChangeDetectorRef,
		private toastr: ToastrService,
		private _activatedRoute: ActivatedRoute,
		private _providerService: ContentProviderService,
		private _helperService: HelperService,
		private _tagsService: TagService
	) { }

	// Data State
	contentTypeList: any[] = []
	dimentionList: any[] = []
	providerList: any[] = []
	companyList: any[] = []
	genreList: any[] = []
	crewList: any[] = []
	tagsList: any[] = []
	contentTypeID: number = null;

	seasons_object: any
	genres_IDs: number[] = []

	editForm: FormGroup;
	isLoadingResults: boolean;
	clearImgSrc: boolean;

	isListLoading: boolean = true
	isDimentionReady: boolean = false


	ngOnInit() {
		this.getUrlID()
		this.getNeededList()
		this.initForm()
		this.checkLocalLang()
	}

	checkLocalLang() {
		this._langService.localLang.subscribe((curreLang) => {
			this.lang = curreLang;
			this.cdr.markForCheck();
		})
	}
	toLang(param) {
		return this.lang == 'en' ? param.en : param.ar;
	}
	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe(params => {
			this.seasons_ID = Number(params.get('id'));
			this.getDataByID();
		});
	}
	getDataByID() {
		this._seasonsService.show(this.seasons_ID).subscribe((resp: any) => {
			this.seasons_object = resp.body;
			this.patchSeasonsData();
			this.isLoadingResults = false;
			this.cdr.detectChanges();
		}, (error: HttpErrorResponse) => {
			this.toastr.error('someThing went wrong!');
			// this.router.navigate(['/']);
		});
	}

	patchSeasonsData() {
		this.editForm.patchValue({
			name: {
				en: this.seasons_object["name"]["en"],
				ar: this.seasons_object["name"]["ar"]
			},
			description: {
				en: this.seasons_object["name"]["en"],
				ar: this.seasons_object["name"]["ar"]
			},

			year: this.seasons_object['year'],
			no_of_episodes: this.seasons_object['no_of_episodes'],
			status: this.seasons_object['status'],
			is_exclusive: this.seasons_object['is_exclusive'],
			is_new: this.seasons_object['is_new'],
			is_asc: this.seasons_object['is_asc'],
			rate: this.seasons_object['rate'],

			content_provider_id: this.seasons_object['content_provider_id'],
			content_images: this.seasons_object['content_images'],

			tags: [this.seasons_object['tags'][0]['id']],
			companies: [this.seasons_object['companies'][0]['id']],
		});
		this.selectedSeasonsYear = this.seasons_object['year'];
		console.log(this.selectedSeasonsYear);
	}

	protected get geteditForm() {
		return this.editForm.controls;
	}

	private initForm() {
		this.editForm = this.fb.group({
			name: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			description: this.fb.group({
				en: new FormControl('', [Validators.required]),
				ar: new FormControl('', [Validators.required]),
			}),
			year: new FormControl('', [Validators.required]),
			no_of_episodes: new FormControl('', [Validators.required]),
			status: new FormControl(0, [Validators.required]), //boolen
			is_exclusive: new FormControl(0, [Validators.required]), //boolen
			is_new: new FormControl(0, [Validators.required]), //boolen
			is_asc: new FormControl(0, [Validators.required]), //boolen
			rate: new FormControl('', [Validators.required]), //boolen

			content_type_id: new FormControl('', [Validators.required]),
			content_images: this.fb.array([this.contentImgsForm]),

			tags: new FormControl([], [Validators.required]),
			companies: new FormControl([], [Validators.required]),
		})
	}

	patchContentTypeID() {
		this.editForm.patchValue({
			content_type_id: this.contentTypeID
		})
	}


	patchContentImgs(): void {
		if (this.dimentionList.length > 0) {
			for (let i = 1; i < this.dimentionList.length; i++) {
				this.getContentImgs.push(this.contentImgsForm())
				this.cdr.markForCheck()
			}
			this.isDimentionReady = true
		}
	}

	contentImgsForm() {
		return this.fb.group({
			img: new FormControl('', [Validators.required]),
			dimention_id: new FormControl('', [Validators.required]),
		})
	}

	get getContentImgs() {
		return this.editForm.get('content_images') as FormArray
	}

	getNeededList() {
		this._providerService.list().subscribe((resp) => {
			this.providerList = resp.body;
			this.cdr.markForCheck()
		})
		this._companiesSerivce.list().subscribe((resp) => {
			this.companyList = resp.body;
			this.cdr.markForCheck()
		})
		this._helperService.contentTypesList().subscribe((resp) => {
			this.contentTypeList = resp.body;
			this.contentTypeList.forEach(item => {
				if (item['key'] == 'series_season') {
					this.contentTypeID = item.id
				}
			});
			this.patchContentTypeID()
			this.getDimentionList();
			this.cdr.markForCheck()
		})

		this._tagsService.list().subscribe((resp) => {
			this.tagsList = resp.body;
			this.cdr.markForCheck()
		})
	}

	getDimentionList() {
		this._helperService.dimentionsList().subscribe((resp) => {
			this.dimentionList = resp.body;
			this.dimentionList = this.dimentionList.filter(item =>
				item['content_type']['id'] == this.contentTypeID
			)
			this.patchContentImgs()
			this.cdr.markForCheck()
		})
	}
	formattedDate(dateParam) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		console.log('this.editForm.value', this.editForm.value);

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			this.toastr.error('Check all required field');
			// return
		}
		this._seasonsService.edit(this.seasons_ID, this.editForm.value).subscribe((resp) => {
			this.toastr.success(resp.message + ' successfully');
			this.cdr.markForCheck();
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.cdr.markForCheck();
			})
	}

}

