import { CompanyService } from './../../../../../core/services/Clips-Module/company.service';
import { SeasonsService } from './../../../../../core/services/Series-Module/seasons.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common'; import { SeriesService } from './../../../../../core/services/Series-Module/series.service';
import { TagService } from './../../../../../core/services/Clips-Module/tags.service';
import { HelperService } from './../../../../../core/services/helper.service';
import { ContentProviderService } from './../../../../../core/services/Clips-Module/content-provider.service';
import { ActivatedRoute } from '@angular/router';
import { LangService } from './../../../../../core/services/lang.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent {
	btnLoading: boolean = false;

	isLoading: boolean = false;
	// isStarChecked: boolean = false;
	isStatusChecked: boolean = false;
	clearValue: boolean
	seasons_ID: number;
	series_ID: number;
	lang: string = 'en'
	selectedSeasonsYear: string

	constructor(
		private fb: FormBuilder,
		private _location: Location,
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
	ratingList: any[] = [
		{
			key: '+13',
			value: '13'
		},
		{
			key: '+15',
			value: '15'
		},
		{
			key: '+18',
			value: '18'
		},
		{
			key: "All Ages",
			value: '0'
		},
	]

	contentTypeID: number = null;

	seasons_object: any
	genres_IDs: number[] = []

	editForm: FormGroup;
	isLoadingResults: boolean;

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
	convertLable(param: string, index: number) {
		const requriedLabel = index == 0 ? ' *' : ''
		return param.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + requriedLabel;
	}
	getUrlID() {
		this.isLoadingResults = true
		this._activatedRoute.paramMap.subscribe((params: any) => {
			this.seasons_ID = Number(params.get('id'));
			this.getDataByID();
		});
		this._activatedRoute.queryParams.subscribe((params: any) => {
			this.series_ID = params.series
		})
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
		console.log(this.series_ID, 'patchSeasonsData');

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
			series_id: this.series_ID,

			// content_provider_id: this.seasons_object['content_provider']['id'],
			content_images: this.seasons_object['content_images'],

			tags: [this.seasons_object['tags'][0]['id']],
			companies: [this.seasons_object['companies'][0]['id']],
		});
		this.selectedSeasonsYear = this.seasons_object['year'];
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
			series_id: new FormControl(this.series_ID as number || ''),

			content_type_id: new FormControl('', [Validators.required]),
			// content_provider_id: new FormControl('', [Validators.required]),
			content_images: this.fb.array([]),

			tags: new FormControl([], [Validators.required]),
			companies: new FormControl([], [Validators.required]),
		})
	}

	patchContentTypeID() {
		this.editForm.patchValue({
			content_type_id: this.contentTypeID
		})
	}


	patchContentImgs() {
		if (this.dimentionList.length > 0) {
			for (let i = 0; i < this.dimentionList.length; i++) {
				this.getContentImgs.push(this.contentImgsForm())
				this.cdr.markForCheck()
			}
			this.setContentImgsValidation()
			this.isDimentionReady = true
		}
	}

	contentImgsForm() {
		return this.fb.group({
			img: new FormControl(''),
			dimention_id: new FormControl(''),
		})
	}
	setContentImgsValidation() {
		// Make the first content img control required
		if (this.getContentImgs.length > 0) {
			this.getContentImgs.controls[0]['controls']['img'].setValidators(Validators.required);
			this.getContentImgs.controls[0]['controls']['img'].updateValueAndValidity();
		}
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
	formattedDate(dateParam: string) {
		const date = new Date(dateParam);
		return date.toISOString().slice(0, 10);
	}
	submit() {
		this.btnLoading = true;
		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			this.toastr.error('Check required fields');
			this.btnLoading = false;
			return
		}
		const formData = this.editForm.value
		// Remove null values from the formControls array
		formData['content_images'] = this.getContentImgs.value.filter((item: any) => item.img)

		this._seasonsService.edit(this.seasons_ID, formData).subscribe((resp) => {
			this.toastr.success(resp.message + ' successfully');
			this.btnLoading = false;
			this._location.back();
			this.cdr.markForCheck();
		},
			(error) => {
				this.toastr.error(error.error.message);
				this.btnLoading = false;
				this.cdr.markForCheck();
			})
	}

}


